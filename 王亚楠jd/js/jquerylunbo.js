function Banner(speed){
    this.speed = speed;
};
$.extend(Banner.prototype , {
    
    init:function(options){
        //li
        this.item_list = $(options.item_list);
        //左按钮
        this.left_btn = $(options.left_btn);
        //右按钮
        this.right_btn = $(options.right_btn);
        //按钮列表
        this.list_btn = $(options.list_btn);
        //li父级
        this.list = this.item_list.parent();
        //当前图片下标
        this.nowIndex = 0;
        //速度
        
        this.wrap = $(options.wrap);
        
        //li长度
        this.item_num = this.item_list.length;
        //如果没有按钮 不调用绑定事件的方法 
        //直接播放
       
            this.bindEvent();
        
        //如果auto为true 播放
        if(options.autoPlay){
            this.autoPlay();
        }
    },
    //绑定事件
    bindEvent : function(){
        //绑定事件      
        this.left_btn.click($.proxy(this.prev , this));
        this.right_btn.click($.proxy(this.next , this));
        this.list_btn.mouseover($.proxy(this.toIndex , this));
    },
    //右按钮
    next : function(){
        if(this.nowIndex == this.item_num - 1){
            this.list.css({
                left : 0
            })
            this.nowIndex = 1
        }else{
            this.nowIndex++
        }
        this.animate();
       

    },
    //左按钮
    prev : function(){
        if(this.nowIndex == 0){
          this.nowIndex = this.item_num - 2
          this.list.css({
              left : -this.speed * (this.item_num -1)
          })
        }else{
            this.nowIndex--
        }
        this.animate();
        console.log(this.nowIndex)
    },
    //图片对应小button
    toIndex : function(event){
        //当前触发事件的按钮是谁
        var target = event.target;
        //indexI()   查找下标的方法
        this.nowIndex = $(target).index();
        console.log(this.nowIndex);
        this.animate();

    },
    //自动播放
    autoPlay : function(){
        $(this.wrap).mouseover(function(){
            clearInterval(this.banner_timer);
        }.bind(this))
        $(this.wrap).mouseout(function(){
            this.banner_timer = setInterval(function(){
            this.next();
            }.bind(this) ,3000)
        }.bind(this)).trigger('mouseout');
        
    },
    //动画 动起来啊
    animate : function(){
        this.list.stop().animate({
            left : - this.nowIndex * this.speed
        })
        this.list_btn.removeClass('active');
        
        var index
        if(this.nowIndex == this.item_num - 1){
            index = 0;
        }else{
            index = this.nowIndex
        }
        this.list_btn.eq(index).addClass('active')
    }
})
// var banner = new Banner();
//     banner.init({
//         item_list : "#list li",
//                     // 非必填;
//                     left_btn : "#left",
//                     right_btn : "#right",
//                     list_btn : "#btn_list button",
//                     autoPlay : true
//     })