import path from 'path';
import fs from 'fs';
import { AddShortcut } from '../util/Shortcut';
import { getShortcutAppID } from '../util/AppID';
import { AddToCats } from '../util/Categories';
import { setBackground, setCapsule, setLogo, setWideCapsule } from '../util/Grid';

const outPath = path.join(
	`${process.env.PWD}`,
	'out',
	'chrome'
);
const PAGE_URLS = [
	{ name: 'VPNGate', url: 'https://vpngate.net', tags: ['VPN'] },
	{ name: 'Abema TV', url: 'https://abema.tv', tags: ['Live', 'OTT'], icon: `${process.env.PWD}/image/icon/abema.ico`, logo: `${process.env.PWD}/image/logo/abema.png`, capsule: `${process.env.PWD}/image/capsule/abema.png`, background: `${process.env.PWD}/image/background/abema.png`, widecapsule: `${process.env.PWD}/image/widecapsule/abema.png` },
	{ name: 'Twitch', url: 'https://twitch.tv', tags: ['Live', 'Video'], icon: `${process.env.PWD}/image/icon/twitch.png`, logo: `${process.env.PWD}/image/logo/twitch.png`, capsule: `${process.env.PWD}/image/capsule/twitch.png`, widecapsule: `${process.env.PWD}/image/widecapsule/twitch.png`, background: `${process.env.PWD}/image/background/twitch.png` },
	{ name: 'YouTube', url: 'https://youtube.com/tv', tags: ['Live', 'Video'], icon: `${process.env.PWD}/image/icon/youtube.ico` },
	{ name: 'bilibili', url: 'https://bilibili.com', tags: ['Video'], icon: `${process.env.PWD}/image/icon/bilibili.ico` },
	{ name: 'Coupang Play', url: 'https://coupangplay.com/profiles', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/coupangplay.ico`, logo: `${process.env.PWD}/image/logo/coupangplay.png`, widecapsule: `${process.env.PWD}/image/widecapsule/coupangplay.png`, capsule: `${process.env.PWD}/image/capsule/coupangplay.png`, background: `${process.env.PWD}/image/background/coupangplay.jpg` },
	{ name: 'Crunchyroll', url: 'https://crunchyroll.com', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/crunchyroll.png`, logo: `${process.env.PWD}/image/logo/crunchyroll.png`, widecapsule: `${process.env.PWD}/image/widecapsule/crunchyroll.png`, capsule: `${process.env.PWD}/image/capsule/crunchyroll.png`, background: `${process.env.PWD}/image/background/crunchyroll.png` },
	{ name: 'Netflix', url: 'https://netflix.com', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/netflix.ico`, background: `${process.env.PWD}/image/background/netflix.jpg`, widecapsule: `${process.env.PWD}/image/widecapsule/netflix.jpg`, logo: `${process.env.PWD}/image/logo/netflix.png`, capsule: `${process.env.PWD}/image/capsule/netflix.jpg` },
	{ name: 'Laftel', url: 'https://laftel.net/profile', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/laftel.png`, logo: `${process.env.PWD}/image/logo/laftel.png`, widecapsule: `${process.env.PWD}/image/widecapsule/laftel.png`, capsule: `${process.env.PWD}/image/capsule/laftel.png`, background: `${process.env.PWD}/image/background/laftel.png` },
	{ name: 'Watcha', url: 'https://watcha.com/manage_profiles', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/watcha.ico` },
	{ name: 'Wavve', url: 'https://www.wavve.com', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/wavve.ico` },
	{ name: 'Tubi', url: 'https://www.tubitv.com', tags: ['OTT'], icon: `${process.env.PWD}/image/icon/tubi.webp` },
	{ name: 'Twitter Analytics', url: 'https://analytics.twitter.com', tags: ['Dashboard'], icon: `${process.env.PWD}/image/icon/twitter.ico` },
	{ name: 'Twitch Dashboard', url: 'https://dashboard.twitch.tv/stream-manager', tags: ['Dashboard'], icon: `${process.env.PWD}/image/icon/twitch.png`, logo: `${process.env.PWD}/image/logo/twitch.png`, capsule: `${process.env.PWD}/image/capsule/twitch.png`, widecapsule: `${process.env.PWD}/image/widecapsule/twitch.png`, background: `${process.env.PWD}/image/background/twitch.png` },
	{ name: 'YouTube Studio', url: 'https://studio.youtube.com', tags: ['Dashboard'], icon: `${process.env.PWD}/image/icon/youtube.png` },
	{ name: 'Restream.io', url: 'https://app.restream.io', tags: ['Dashboard'], icon: `${process.env.PWD}/image/icon/restream.ico` },
	{ name: 'Twitter', url: 'https://twitter.com', tags: ['SNS', 'Social'], icon: `${process.env.PWD}/image/icon/twitter.ico` },
	{ name: 'MahjongSoul[EN]', url: 'https://mahjongsoul.game.yo-star.com/', tags: ['MahjongSoul'], icon: `${process.env.PWD}/image/icon/mahjongsoul.png` },
	{ name: 'MahjongSoul[KR]', url: 'https://mahjongsoul.game.yo-star.com/kr/index.html', tags: ['MahjongSoul'], icon: `${process.env.PWD}/image/icon/mahjongsoul.png` },
	{ name: 'MahjongSoul[JP]', url: 'https://game.mahjongsoul.com/index.html', tags: ['MahjongSoul'], icon: `${process.env.PWD}/image/icon/mahjongsoul.png` },
	{ name: 'Gmail', url: 'https://gmail.com', tags: ['Email'], icon: `${process.env.PWD}/image/icon/gmail.ico` },
	{ name: '网易免费邮箱(Netease Free Email)', url: 'https://email.163.com', tags: ['Email'], icon: `${process.env.PWD}/image/icon/neteasemail.ico` },
	{ name: 'Geolocation(Netflix)', url: 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location', tags: ['geolocation'], icon: `${process.env.PWD}/image/icon/netflix.ico` }
];

export async function __main__ () {
	const outFiles = fs.readdirSync(outPath);
	for (let i = 0; i < outFiles?.length; i++) {
		const filename = outFiles[i];
		const StartDir = outPath;
		const exe = path.join(outPath, filename);
		if (filename == 'kiosk.out') {
			for (let j = 0; j < PAGE_URLS?.length; j++) {
				const { name, url, tags, icon, background, widecapsule, logo, capsule } = PAGE_URLS[j];
				const appid = getShortcutAppID({ AppName: name, exe });
				AddShortcut({ appid, AppName: name, exe, StartDir, LaunchOptions: `PAGE_URL="${url}" %command%`, tags, icon: icon ?? '' });
				if (background) {
					setBackground({
						appid,
						path: background
					});
				}
				if (widecapsule) {
					setWideCapsule({
						appid,
						path: widecapsule
					});
				}
				if (capsule) {
					setCapsule({
						appid,
						path: capsule
					});
				}
				if (logo) {
					setLogo({
						appid,
						path: logo
					});
				}
				for (let k = 0; k < tags?.length; k++) {
					const tag = tags[k];
					if (!tag) continue;
					await AddToCats(appid, tag);
				}
			}
		}
	}
}

// https://stackoverflow.com/questions/4981891/node-js-equivalent-of-pythons-if-name-main
if (typeof require !== 'undefined' && require.main === module) {
	__main__();
}
