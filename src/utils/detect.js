var BrowserDetect =
	{
		init: function () {
			//alert(navigator.userAgent);
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1)
				return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},

		dataBrowser:
			[
				{
					string: navigator.userAgent,
					subString: "Chrome",
					identity: "Chrome"
				},
				{
					string: navigator.userAgent,
					subString: "OmniWeb",
					versionSearch: "OmniWeb/",
					identity: "OmniWeb"
				},
				{
					string: navigator.vendor,
					subString: "Apple",
					identity: "Safari",
					versionSearch: "Version"
				},
				{
					prop: window.opera,
					identity: "Opera",
					versionSearch: "Version"
				},
				{
					string: navigator.vendor,
					subString: "iCab",
					identity: "iCab"
				},
				{
					string: navigator.vendor,
					subString: "KDE",
					identity: "Konqueror"
				},
				{
					string: navigator.userAgent,
					subString: "Firefox",
					identity: "Firefox"
				},
				{
					string: navigator.vendor,
					subString: "Camino",
					identity: "Camino"
				},
				{ // for newer Netscapes (6+)
					string: navigator.userAgent,
					subString: "Netscape",
					identity: "Netscape"
				},
				{
					string: navigator.userAgent,
					subString: "MSIE",
					identity: "Explorer",
					versionSearch: "MSIE"
				}
				,
				{
					//IE11
					string: navigator.userAgent,
					subString: "Gecko",	//在navigator.userAgent中查找Gecko
					identity: "Explorer",	//标识为哪个浏览器
					versionSearch: "rv"	//版本查找
				}
				// ,
				// {
				// string : navigator.userAgent,
				// subString : "Gecko",
				// identity : "Mozilla",
				// versionSearch : "rv"
				// }
				// ,
				// { // for older Netscapes (4-)
				// string : navigator.userAgent,
				// subString : "Mozilla",
				// identity : "Netscape",
				// versionSearch : "Mozilla"
				// }

			],
		dataOS: [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone/iPod"
			},
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		],
		// 注册回调事件(插件名，插件提供的事件名称，调用的JS函数)
		registerCallBack: function (obj, name, proc) {
			if (typeof (proc) != "function")
				return;
			if (window.ActiveXObject || "ActiveXObject" in window) {
				if (window.ActiveXObject && obj.attachEvent) {
					obj.attachEvent(name, proc);
				} else {
					cloudWalk_AttachIE11Event(obj, name, proc);
				}
			} else {
				obj[name] = proc;
			}
		},

// IE11注册回调事件
 cloudWalk_AttachIE11Event : function (obj, _strEventId, _functionCallback) {
			var nameFromToStringRegex = /^function\s?([^\s(]*)/;
			var paramsFromToStringRegex = /\(\)|\(.+\)/;
			var params = _functionCallback.toString().match(paramsFromToStringRegex)[0];
			var functionName = _functionCallback.name || _functionCallback.toString().match(nameFromToStringRegex)[1];
			var handler;
			try {
				handler = document.createElement("script");
				handler.setAttribute("for", obj.id);
			} catch (ex) {
				handler = document.createElement('<script for="' + obj.id + '">');
			}
			handler.event = _strEventId + params;
			handler.appendChild(document.createTextNode(functionName + params + ";"));
			document.body.appendChild(handler);
		}

	};

export default BrowserDetect
//alert(BrowserDetect.browser+"  "+BrowserDetect.version+"  "+BrowserDetect.OS);
