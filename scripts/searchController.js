export class searchController extends URLSearchParams {
    constructor(searchUrl,indicators) {
        super(searchUrl);
        this.currentPage = 1;
        this.lastpage = 1;
        this.indicators = indicators;
        this.searchUrl = searchUrl;
        this.filterOn = false;
    }
    setLastPage(newLastPage) {
        this.lastpage = newLastPage;
    }

    setSearchFilter(key, value) {
        super.set(key, value);
        this.filterOn = true;
    }

    getSearchFilter(key,value) {
        return super.get(key) 
    }

    getSearchUrl() {
        this.searchUrl.search = super.toString();
        let url = this.searchUrl.toString();
        return url;
    }

    filterIsOn() {
        if(this.filterOn)
            return true;
        return false;
    }
    
    firstPage() {
        this.currentPage = 1;
        if(this.indicators !== undefined)  
            this.indicators.forEach(indicator => indicator.innerHTML = this.currentPage);
        super.set("page", this.currentPage);
    }

    nextPage() {
        if(this.currentPage == this.lastpage)
            return
        this.currentPage++;
        if(this.indicators !== undefined)
            this.indicators.forEach(indicator => indicator.innerHTML = this.currentPage);
        super.set("page", this.currentPage);
    }

    prevPage() {
        if(this.currentPage == 1)
            return
        this.currentPage--;
        if(this.indicators !== undefined)
            this.indicators.forEach(indicator => indicator.innerHTML = this.currentPage);
        super.set("page", this.currentPage);
    }

    lastlastPage() {
        this.currentPage = this.lastpage;
        if(this.indicators !== undefined)
            this.indicators.forEach(indicator => indicator.innerHTML = this.currentPage);
        super.set("page", this.currentPage);
    }

    resetFilters() {
        const filters = super.entries();
        filters.forEach(([key,value]) => {
            super.set(key, "")
        });
        
        this.filterOn = false;
    }
        
}
