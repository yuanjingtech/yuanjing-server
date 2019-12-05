import fetch from 'node-fetch';
class SubAppService {
    async getAppList(): Promise<Array<any>> {
        const apps = [
            {
                id: 0,
                name: 'Demo',
                url: 'http://www.baidu.com',
            },
            {
                id: 1,
                name: '笑话',
                url: 'http://joke.yuanjingtech.com',
                icon_name: "smile-o"
            },
            {
                id: 2,
                name: '远景',
                url: 'http://www.yuanjingtech.com',
                icon_name: 'star-o'
            },
            {
                id: 3,
                name: '导航',
                url: 'http://daohang.binbinsoft.com/',
                icon_name: 'internet-explorer'
            },
            {
                id: 4,
                name: '优惠',
                url: 'http://youhui.yuanjingtech.com/',
                icon_name: "tags"
            },
            {
                id: 5,
                name: "更多",
                url: "http://www.yuanjingtech.com/more.html",
                icon_name: "bars"
            },
            {
                id: 6,
                name: "来阅读",
                url: "https://xread-web.now.sh/",
                icon_name: "bars"
            },
            {
                id: 7,
                name: '笑话2',
                url: 'http://joke2.yuanjingtech.com',
                icon_name: "smile-o"
            },
            {
                id: 8,
                name: '博客',
                url: 'https://lotosbin.github.io/',
                icon_name: "smile-o"
            },
            {
                id: 9,
                name: 'V2EX',
                url: 'https://www.v2ex.com/?r=lotosbin',
                icon_name: "smile-o"
            },
            {
                id: 10,
                name: '毒鸡汤',
                url: 'https://lab.lalkk.com/fun/du/',
                icon_name: "smile-o"
            }, {
                id: 11,
                name: '仙人球调查',
                url: 'https://xrq360.com/',
                icon_name: "smile-o"
            }];
        const applist2 = await this.getAppListFromDaohang();
        console.log(`${JSON.stringify(applist2)}`);
        return apps.concat(applist2);
    }

    private async getAppListFromDaohang(): Promise<Array<any>> {
        try {
            const response = await fetch("http://daohang.binbinsoft.com/widget/json?name=lotosbin");
            const appList = await response.json();
            return appList.map((e: { Id: any; Name: any; Url: any; }) => ({id: e.Id, name: e.Name, url: e.Url}))
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export const subAppService = new SubAppService();
