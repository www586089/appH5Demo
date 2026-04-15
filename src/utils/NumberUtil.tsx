export class NumberUtil {
    /**
     * @description 将数字格式化为千分位
     * @param num
     * @returns
     */
    static format(num: number | string): string {
        if (typeof num === 'string') {
            num = Number(num);
        }
        if (Number.isNaN(num)) {
            return '';
        }
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * @description 将数字格式化为百分比
     * @param num
     * @param fixed
     * @returns
     * */
    static formatPercent(num: number | string, fixed = 2): string {
        if (typeof num === 'string') {
            num = Number(num);
        }
        if (Number.isNaN(num)) {
            return '';
        }
        return (num * 100).toFixed(fixed) + '%';
    }


    static setCookie(cname, cvalue, exdays){
	    var d = new Date();
	    d.setTime(d.getTime()+(exdays*24*60*60*1000));
	    var expires = "expires="+d.toLocaleDateString();
	    document.cookie = cname+"="+cvalue+"; "+expires;
    }

    static getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
		    var c = ca[i].trim();
		    if (c.indexOf(name)==0) {
                 return c.substring(name.length+1,c.length); 
            }
    	}
	    return "";
    }

    //解析cookie
    static parseCookie() {
        var cookie = document.cookie;
        var cookieArr = cookie.split(';');
        var cookieObj = {};
        for(var i = 0; i < cookieArr.length; i++){
            var cookieItem = cookieArr[i].split('=');
            cookieObj[cookieItem[0]] = cookieItem[1];
        }
        return cookieObj;
    }

    //获取cookie过期时间
    static getCookieExpireTime() {
        var cookieObj = this.parseCookie();
        var cookieExpireTime = cookieObj['expires'];
        return cookieExpireTime;
    }
}