import fetch from 'node-fetch';

class SubAppService {
    async getAppList(): Promise<Array<any>> {
        return await this.getAppListFromDaohang();
    }

    private async getAppListFromDaohang(): Promise<Array<any>> {
        try {
            const response = await fetch("http://daohang.binbinsoft.com/widget/json?name=lotosbin&pagesize=100");
            const appList = await response.json();
            return appList.map((e: { Id: any; Name: any; Url: any; }) => ({id: e.Id, name: e.Name, url: e.Url})).reverse()
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

export const subAppService = new SubAppService();
