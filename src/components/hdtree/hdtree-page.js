
export default {
  data: {
     page: {
       current: 1,
       total: 0,
       size: 20,
       totalPage: 0
     }

  },

  methods: {
    firstPage() {
        this.page.current = 1;
       // console.log("第一页")
        this.loadData();
    },

    lastPage() {
        this.page.current = this.page.totalPage;
        this.loadData();
       // console.log("最后一页")
    },

    nextPage() {
        this.page.current++;
        if(this.page.current > this.page.totalPage) {
           this.page.current = this.page.totalPage;
        }

        this.loadData();
       // console.log("下一页")
    },

    prevPage() {
        this.page.current--;
        if(this.page.current < 1) {
          this.page.current = 1;
        }

        this.loadData();
       // console.log("上一页")
    },

    loadData() {
       let pageStr = "&"+this.defaultkey.pageNum+"=" + this.page.current + "&"+this.defaultkey.pageSize+"=" + this.page.size
       $.ajax({
            url :this.url.split("?")[0],
            data: this.params + pageStr,
            xhrFields: {
              withCredentials: true
            },
            crossDomain: true,
            success: (result)=>{
              let data = result;
              this.defaultkey.data.split(".").forEach(item=>{
                  data = data[item];
              })

              let total = result;
              this.defaultkey.total.split(".").forEach(item=>{
                  total = total[item]
              })


              !this.ispage && data.forEach(item=>{
                  item.isParent = true;
              })
              this.page.total = total;
              this.page.totalPage = Math.ceil(total/this.page.size);
              this.redraw(data)
          }
       })
    }
  }
}
