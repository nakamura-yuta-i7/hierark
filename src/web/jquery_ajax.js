module.exports = new JqueryAjax;
function JqueryAjax() {
	if ( this instanceof Window ) {
		// throw Error("こらー！newして使ってくださいね");
		return new JqueryAjax();
	}
	var self = this;
	self.get = function(params) {
		return $.ajax({
			async    : true,
			cache    : false,
			type     : "GET",
			dataType : params.dataType || "json",
			url      : params.url || "/",
			data     : params.data || {},
			context  : params.context || document,
			success  : params.success || function(data){ console.debug( data ); }
		});
	}
	self.post = function(params) {
		console.debug( "ajax.post params:", params );
		var postData = params.data;
		
		var ajaxParams = {
			async    : true,
			cache    : false,
			type     : "post",
			dataType : params.dataType || "json",
			url      : params.url || "/",
			data     : postData,
			context  : params.context || document,
			success  : params.success || function(data){ console.debug( data ); },
			xhr      : params.xhr || function(){
				XHR = $.ajaxSettings.xhr();
				if( XHR.upload ){
					XHR.upload.addEventListener('progress',function(e){
						progre = parseInt( e.loaded / e.total * 10000 ) / 100;
						console.debug(progre+"%");
						$("#progress-bar").width(progre + "%");
					}, false);
				}
				return XHR;
			}
		};
		
		// FILEアップロードする場合
		if ( params.file || params.files ) {
			
			var formData = new FormData();
			if ( params.data ) {
				Object.keys(params.data).forEach(function(key){
					formData.append(key, params.data[key]);
				});
			}
			if ( params.file ) {
				formData.append("file", params.file);
			}
			if ( params.files ) {
				Object.keys(params.files).forEach(function(key){
					var file = params.files[key];
					formData.append("files[]", file);
				});
			}
			
			ajaxParams.data = formData;
			ajaxParams.contentType = false; // FormData使う場合、必須
			ajaxParams.processData = false; // FormData使う場合、必須
		}
		
		return $.ajax(ajaxParams);
	}
	self.uploadSingle = function(file, params) {
		params.file = file;
		return self.post(params);
	}
	self.uploadMulti = function(files, params) {
		params.files = files;
		return self.post(params);
	}
}
