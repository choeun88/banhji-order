/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'banhji-accounting-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'b-overview-61': '&#xe93d;',
		'b-sestion-57': '&#xe93e;',
		'b-sestion-58': '&#xe93f;',
		'b-warehouses': '&#xe940;',
		'b-add': '&#xe900;',
		'b-full': '&#xe901;',
		'b-chat': '&#xe902;',
		'b-close': '&#xe903;',
		'b-logout': '&#xe904;',
		'b-search': '&#xe905;',
		'b-mini': '&#xe906;',
		'b-management': '&#xe907;',
		'b-segment': '&#xe908;',
		'b-recivable': '&#xe909;',
		'b-payable': '&#xe90a;',
		'b-payroll': '&#xe90b;',
		'b-accounting': '&#xe90c;',
		'b-cash': '&#xe90d;',
		'b-banking': '&#xe90e;',
		'b-billing': '&#xe90f;',
		'b-budget': '&#xe910;',
		'b-commerce': '&#xe911;',
		'b-compliance': '&#xe912;',
		'b-cooperative': '&#xe913;',
		'b-dimensions': '&#xe914;',
		'b-e_commerce': '&#xe915;',
		'b-financing': '&#xe916;',
		'b-fund_acc': '&#xe917;',
		'b-funding': '&#xe918;',
		'b-general_ledger': '&#xe919;',
		'b-insurance': '&#xe91a;',
		'b-loyalty': '&#xe91b;',
		'b-modul': '&#xe91c;',
		'b-multiple': '&#xe91d;',
		'b-overview': '&#xe91e;',
		'b-payment': '&#xe91f;',
		'b-pricing': '&#xe921;',
		'b-product': '&#xe922;',
		'b-ratio': '&#xe923;',
		'b-report': '&#xe924;',
		'b-invoice_s': '&#xe930;',
		'b-sale_channel': '&#xe926;',
		'b-service': '&#xe927;',
		'b-specific': '&#xe928;',
		'b-statistics': '&#xe929;',
		'b-structures': '&#xe92a;',
		'b-transation': '&#xe92b;',
		'b-reward': '&#xe920;',
		'b-pos': '&#xe925;',
		'b-favorite': '&#xe92c;',
		'b-catagories': '&#xe92d;',
		'b-refresh': '&#xe92e;',
		'b-franchise': '&#xe92f;',
		'b-delivery_s': '&#xe931;',
		'b-note_s': '&#xe932;',
		'b-order_type': '&#xe933;',
		'b-parksale': '&#xe934;',
		'b-count_guest': '&#xe935;',
		'b-promotion': '&#xe936;',
		'b-reward_s': '&#xe937;',
		'b-offline_online': '&#xe938;',
		'b-sestion': '&#xe939;',
		'b-default_image': '&#xe93c;',
		'b-setting': '&#xe93a;',
		'b-resources': '&#xe93b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/b-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
