// -----------------------引入层----------------------------

import './index.html';       //引入这个为了处理.html的图片

import  React from 'react';
import  ReactDOM from 'react-dom';
import $ from 'jquery';
// import Vue from 'vue';
import axios from 'axios';
import 'font-awesome/css/font-awesome.css';
import './src/common/style/base.scss';
import './src/common/style/sass.scss';

let loadingImg = require('./src/common/img/loading.gif'),
    skillLoadImg = require('./src/common/img/skill-loading.gif'),
    aboutLoadImg = require('./src/common/img/about-loading.gif'),
    aboutMeImg =  require('./src/common/img/aboutMe.png'),
    _s1 = require('./src/common/img/s1.png'),
    _s2 =  require('./src/common/img/s2.png'),
    _s3 =  require('./src/common/img/s3.png'),
    _s4 =  require('./src/common/img/s4.png'),
    _s5 =  require('./src/common/img/s5.png'),
    _s6 =  require('./src/common/img/s6.png'),
    _s7 =  require('./src/common/img/s7.png'),
    _s8 =  require('./src/common/img/s8.png'),
    _s9 =  require('./src/common/img/s9.png'),
    _img1 = require('./src/common/img/hitui-pc.jpg'),
    _img2 = require('./src/common/img/hst-pc.jpg'),
    _img3 = require('./src/common/img/tuliao-pc.jpg'),
    _img4 = require('./src/common/img/bjfz-pc.jpg'),
    _img5 = require('./src/common/img/ylm-pc.jpg'),
    _img6 = require('./src/common/img/yingnuo-pc.jpg'),
    _img7 = require('./src/common/img/oa-wap.jpg'),
    _img8 = require('./src/common/img/shequ-wap.jpg'),
    _img9 = require('./src/common/img/bjfz-wap.jpg'),
    _img10 = require('./src/common/img/cp-wap.jpg'),
    _img11 = require('./src/common/img/qhsh-wap.jpg'),
    _img12 = require('./src/common/img/tuliao-wap.jpg'),
    _img13 = require('./src/common/img/zyjcb-wap.jpg'),
    _img14 = require('./src/common/img/hitui-wap.jpg'),
    _img15 = require('./src/common/img/wx-hjdgs.jpg'),
    _img16 = require('./src/common/img/wx-fcmp.jpg'),
    _img17 = require('./src/common/img/wx-hthdzx.jpg'),
    _img18 = require('./src/common/img/wx-hitui.jpg'),
    _img19 = require('./src/common/img/wx-htjyh.jpg');

// -----------------------方法层----------------------------
window.onload= function() {

    // loadImg.js
    loadImg:{
        let lazyImg = document.getElementsByClassName("lazy-img"),
            lazyImgNum = lazyImg.length,
            n = 0;//存储图片加载到的位置，避免每次都从第一张图片开始遍历
        lazyload(); //页面载入完毕加载可是区域内的图片
        //window.onscroll = lazyload;
        function lazyload() { //监听页面滚动事件
            let seeHeight = document.documentElement.clientHeight, //可见区域高度
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
            for (let i = n; i < lazyImgNum; i++) {
                if (lazyImg[i].offsetTop < seeHeight + scrollTop) {
                    if (lazyImg[i].className='lazy-img') {
                        lazyImg[i].src = lazyImg[i].getAttribute("data-src");
                    }
                    n = i + 1;
                }
            }
        }

        // 简单的节流函数
        //fun 要执行的函数
        //delay 延迟
        //time 在time时间内必须执行一次
        function throttle(fun, delay, time) {
            let timeout,
                startTime = new Date();
            return function() {
                let context = this,
                    args = arguments,
                    curTime = new Date();
                clearTimeout(timeout);
                // 如果达到了规定的触发时间间隔，触发 handler
                if (curTime - startTime >= time) {
                    fun.apply(context, args);
                    startTime = curTime;
                } else {
                    timeout = setTimeout(fun, delay);
                }
            };
        };
        // 采用了节流函数
        window.addEventListener('scroll',throttle(lazyload,500,1000));
    }

    // banner.js
    banner:{
        let box  = document.getElementById("my-banner");  //   获得大盒子
        let ul = box.children[0].children[0];  // 获取ul

        let ulLis = ul.children;  //  ul 里面的所有  li
        // 复习：  cloneNode()     克隆节点       追加a.appendChild(b)  把b 放到a 的最后面
        //1.  ulLis[0].cloneNode(true)  克隆  节点
        ul.appendChild(ulLis[0].cloneNode(true));   // ul 是 a   ulLis[0].cloneNode(true) 是b

        //窗口可视范围全屏
        $(window).on('resize', function () {
            let liWid = document.body.clientWidth;
            let ulWid = liWid*ulLis.length;
            $('#ul li').width(liWid);
            $('#ul').width(ulWid);
        }).trigger('resize')

        // ul.style.width = ulWid;
        // console.log(ul.style.width);

        //2. 插入 ol 里面的li
        let ol = box.children[1].children[0];  // 获得ol
        // 因为 我们要创建很多个 ol 里面的li 所以需要用到for 循环哦
        for(let i=0;i<ulLis.length-1;i++) {   // ul 里面的li  长度 要减去 1  因为我们克隆一个
            // 创建节点 li
            let li = document.createElement("li");
            li.innerHTML = i + 1;   //  存在加1 的关系
            // a.appendChild(b);
            ol.appendChild(li);
        }
        let olLis = ol.children;  // 找到 ol 里面的li
        olLis[0].className = 'cur';
        // 3. 动画部分  遍历小li ol
        for(let i=0;i<olLis.length;i++) {
            olLis[i].index = i;  // 赋予索引号
            olLis[i].onmouseover = function() {
                // 清除所有人
                for(var j=0;j<olLis.length;j++) {
                    olLis[j].className = "";
                }
                this.className = 'cur';
                animate(ul,-this.index*ulLis[0].offsetWidth);
                key = square = this.index; // 鼠标经过 key square 要等于 当前的索引号
            }
        }
        // 4. 定时器部分  难点
        let timer = null;  // 定时器
        let key = 0; // 用来控制图片的播放的
        let square = 0;  // 用来控制小方块的
        timer = setInterval(autoplay,4000);   // 每隔4s 调用一次 autoplay
        function autoplay() {
            key++;   // key == 1  先 ++
            //console.log(key); //  不能超过5
            if(key > ulLis.length - 1)
            {
                // alert('停下');
                ul.style.left = 0;
                key = 1;  // 因为第6张就是第一张，我们已经播放完毕了， 下一次播放第2张
                // 第2张的索引号是1
            }
            animate(ul,-key*ulLis[0].offsetWidth);
            // 小方块的做法
            square++;  // 小方块自加1
            square = square>olLis.length-1 ? 0 : square;
            /// 清除所有人
            for(let i=0;i<olLis.length;i++) {
                olLis[i].className = "";
            }
            olLis[square].className = "cur";   // 留下当前自己的
        }

        // 鼠标经过和停止定时器
        box.onmouseover = function() {
            clearInterval(timer);
        }

        box.onmouseout = function() {
            timer = setInterval(autoplay,4000);  // 一定这么开
        }

        //  基本封装
        function animate(obj,target) {
            clearInterval(obj.timer);  // 要开启定时器，先清除以前定时器
            // 有2个参数 第一个 对象谁做动画  第二 距离 到哪里
            // 如果 offsetLeft 大于了  target 目标位置就应该反方向
            let speed = obj.offsetLeft < target ? 15 : -15;
            obj.timer = setInterval(function() {
                var result = target - obj.offsetLeft;  //  他们的值 等于 0 说明完全相等
                // 动画的原理
                obj.style.left = obj.offsetLeft + speed  + "px";
                if(Math.abs(result) <= 15) {
                    obj.style.left = target + "px";   //抖动问题
                    clearInterval(obj.timer);
                }
            },10);
        }
    }

    //skill.js
    skillFn:{
        let $skillLi = document.getElementsByClassName('js-li'),
            skillNum = $skillLi.length,
            skillTimer = null,
            $skillUl = document.getElementById('skills-app');
        function random(){
            let ranNum = parseInt(Math.random()*skillNum);
            $skillUl.children[ranNum].children[0].children[0].className='chg';
        }
        skillTimer = setInterval(random,300);
    }

    //backTop.js
    backTop:{
        let $backTop = $('#back-top'),
            s = 'show';
        $(window).scroll(function() {
            var win_h = $(window).height()/ 2,
                win_s = $(window).scrollTop();
            if( win_h < win_s ){
                $backTop.addClass(s);
            }else{
                $backTop.removeClass(s);
            }
        });
        $backTop.on("click",function() {
            $('html,body').animate({ scrollTop:0 },500);
        });
    }

    // nav.js
    nav:{
        //滚动时显示
        $(window).scroll(function() {
            var win_h = $(window).height()/ 4,
                win_s = $(window).scrollTop();
            if( win_h <= win_s ){
                $('#my-nav').addClass('fixed-top');
            }else{
                $('#my-nav').removeClass('fixed-top');
            }
        });
        //手机模式点击导航：
        $('#mobile-menu').click(function(){
            $('.tm-nav').toggleClass('show');
        })

        //声明变量
        var $liA = $(".js-nav-a"),
            $myCom = $(".js-my-com"),
            s = 'active';
        //获取offset top值
        function getOffTop(a) {
            let getCurTop = $myCom.eq(a).offset().top;
            $("html,body").animate({
                "scrollTop":getCurTop
            },500);
        }
        function curTop() {
            $myCom.each(function (i,e) {
                var curTop = $myCom.eq(i).offset().top;
                if($(window).scrollTop()>=curTop){
                    $liA.removeClass(s)
                    $liA.eq(i).addClass(s);
                }
            })
        }
        //点击触发时
        $liA.each(function (i,e) {
            $(e).on('click',function () {
                getOffTop(i);
                $liA.removeClass(s)
                $(e).addClass(s);
            })
        });
        //滚动时
        $(window).scroll(function(e) {
            curTop();
        });
        //窗口发生变化时
        $(window).on('resize', function () {
            curTop();
        }).trigger('resize');

    }

}



// ------------------------结构层---------------------------

//海报：
class Banner extends React.Component{
    render(){
        return(
            <div className="my-banner" id='my-banner'>
                <div className="screen">
                    <ul id="ul">
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className="bot">
                    <ol>
                    </ol>
                </div>
                <div className="text">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="wel"><h2>Hello</h2></div>
                            <h3 className="">Welcome to my website</h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <Banner />,
    document.getElementById('my-show')
);

// 技能：
const skills = [
    {
        "imgs":_s1,
        "title":"图标01"
    },
    {
        "imgs":_s2,
        "title":"图标02"
    },
    {
        "imgs":_s3,
        "title":"图标03"
    },
    {
        "imgs":_s4,
        "title":"图标04"
    },
    {
        "imgs":_s5,
        "title":"图标05"
    },
    {
        "imgs":_s6,
        "title":"图标06"
    },
    {
        "imgs":_s7,
        "title":"图标07"
    },
    {
        "imgs":_s8,
        "title":"图标08"
    },
    {
        "imgs":_s9,
        "title":"图标09"
    },
]
class Skills extends React.Component{
    render(){
        return(
            skills.map(function (v,key) {
                return <li className="col-sm-3 col-md-4 col-lg-4 js-li" key={key}>
                    <a href="javascript:;" target="_blank" title={v.title} >
                        <img src={skillLoadImg} data-src={v.imgs}  alt="" className="chg lazy-img" lazyimgloaded="true" />
                    </a>
                </li>
            })
        )
    }
}
ReactDOM.render(
    <Skills />,
    document.getElementById('skills-app')
);

//关于我
class Abouts extends React.Component{
    render(){
        return <a href="javascript:;" className="thumbnail">
                <img src={aboutLoadImg} data-src={aboutMeImg} className="lazy-img" title="关于我" alt="关于我" />
            </a>
    }
}
ReactDOM.render(
    <Abouts />,
    document.getElementById('about-app')
);


// 作品：
const works = [
        {
            "id":1,
            "imgs":_img1,
            "title":"pc:嗨推学院",
            "text":"嗨推学院，专注淘宝客推广，淘宝客教程，淘宝客程序，销售视频教程与学习方法，为广大卖家以及淘宝客提供淘宝推广学习交流平台网站。",
            "link":"http://xue.hitui.com/"
        },
        {
            "id":2,
            "imgs":_img2,
            "title":"pc:华诗图",
            "text":"华诗图一直致力于软件定制研发事业，深度挖掘用户需求.集计算机软件，app应用，手机软件的开发于一体，为客户提供专业客户端软件技术支持。",
            "link":"http://www.mdkg.net/"
        },
        {
            "id":3,
            "imgs":_img3,
            "title":"pc:涂料经销商联盟",
            "text":"涂料经销商联盟，专注服务于涂料行业经销商，以帮助企业构建出一个商务人脉圈，优化和补充销售渠道的目的，社交加电商模式的平台网站。",
            "link":"http://www.ccda360.com"
        },
        {
            "id":4,
            "imgs":_img4,
            "title":"pc:北江纺织商城",
            "text":"韶关北江纺织，是一家面料展示平台,是业界领先的牛仔面料生产厂家,专业生产各种优质牛仔面料,各类中高档牛仔面料批发分销的电商平台网站。",
            "link":"http://www.textileapps.com"
        },
        {
            "id":5,
            "imgs":_img5,
            "title":"pc:印了吗商城",
            "text":"印了吗商城，是一家照片冲印定制，相册模版编辑，提供各式相册、台历等照片产品的网上冲印和相册模版个性定制服务的B2C电商平台网站。",
            "link":"javascript:;"
        },
        {
            "id":6,
            "imgs":_img6,
            "title":"pc:英诺公司官网",
            "text":"英诺科技，是一家提供高品质移动应用解决方案的提供商，专注于移动互联网APP开发，微信开发和提供网络整体解决方案的外包行业企业官网。",
            "link":"http://www.innoo.cn"
        },
        {
            "id":7,
            "imgs":_img7,
            "title":"wap:OA分润平台",
            "text":"嗨推学院旗下项目OA分润平台提供给网络推广者，微信微商团队，团队会员管理，团队收支，会员查询，申请团队的会员等级，享受不同的等级服务。",
            "link":"http://sq.hitui.cn/"
        },
        {
            "id":8,
            "imgs":_img8,
            "title":"wap:社群管理",
            "text":"嗨推学院旗下产品手机版社群管理，专职提高给微信群，微信用户提高数据的采集，配合社群后台管理一起应用，引流加粉推广等服务平台。",
            "link":"http://sq.hitui.cn/"
        },
        {
            "id":9,
            "imgs":_img9,
            "title":"wap:北江纺织微商城",
            "text":"微信公众号“北江纺织”，同步PC端网站，是业界领先的牛仔面料生产厂家，专业牛仔面料批发，各种牛仔面料优质供应商的电子商务微商城。",
            "link":"javascript:;"
        },
        {
            "id":10,
            "imgs":_img10,
            "title":"wap:采批文具商城",
            "text":"采批文具商城，负责商品零售批发，专注文具、体育用品批发销售领域，为行业生产商，销售商及相关客户提供质优的商品和便捷使用的微商城。",
            "link":"http://51recai.com/"
        },
        {
            "id":11,
            "imgs":_img11,
            "title":"wap:清化商会",
            "text":"微信公众号 “清化商会”，主要是在中国广东韶关市的商人与商人、商人与社会之间相互联系的，增加家乡文化与商业交流的社区资讯微官站。",
            "link":"http://www.cnqhsh.com"
        },
        {
            "id":12,
            "imgs":_img12,
            "title":"wap:涂料微商城",
            "text":"微信公众号“涂经联新材”，同步涂料经销商PC端网站，以帮助企业构建出一个商务人脉圈，优化和补充销售渠道的目的，社交加电商模式的微商城。",
            "link":"http://www.ccda360.com/wx/index/wxindex.html"
        },
        {
            "id":13,
            "imgs":_img13,
            "title":"wap:仲意建材报",
            "text":"微信公众号“仲意建材报”，主要以建材网展，展会预定，电子书刊，活动资讯的发布等待，展示介绍此平台的的相关信息的企业资讯微网站。",
            "link":"http://zyjiancaibao.com/weixin/expoon/index.html"
        },
        {
            "id":14,
            "imgs":_img14,
            "title":"wap:嗨推学院",
            "text":"微信公众号“嗨推学院”,专注淘宝客推广，淘宝客教程，淘宝客程序，销售视频教程与学习方法，为广大卖家以及淘宝客提供淘宝推广学习交流平台网站。",
            "link":"http://xue.hitui.com/Mobile/Index/index.html"
        },
        {
            "id":15,
            "imgs":_img15,
            "title":"小程序:喝酒的故事",
            "text":"微信小程序：喝酒的故事，嗨推公司开发，提供给贵州知酒堂公司，与酒会友，分享自己与酒的点滴故事，不定期举行活动，送正宗贵州茅台酒哦。",
            "link":"javascript:;"
        },
        {
            "id":16,
            "imgs":_img16,
            "title":"小程序:发财名片",
            "text":"微信小程序：发财名片，嗨推旗下的小程序，提供给企业/个人的名片，名片大全，名片资源，发财名片还有额外收益，加入战队，边推广边赚钱。",
            "link":"javascript:;"
        },
        {
            "id":17,
            "imgs":_img17,
            "title":"小程序:嗨推活动中心",
            "text":"微信小程序：嗨推活动中心，嗨推旗下的小程序，活动中心：新媒体推广，淘宝客培训，微商培训，推广课程视频，推广总监班学习课程等等。",
            "link":"javascript:;"
        },
        {
            "id":18,
            "imgs":_img18,
            "title":"小程序:嗨推学院",
            "text":"微信小程序：嗨推学院，学推广，到嗨推，让网络推广变得更简单，专注淘宝客推广，淘宝客教程，为广大淘宝客提供淘宝推广学习交流平台网站。",
            "link":"javascript:;"
        },
        {
            "id":19,
            "imgs":_img19,
            "title":"小程序:嗨推精英会",
            "text":"微信小程序：推广精英大咖线下分享，大房间小房间知识操作讨论，共享互利，一一解答问题，实地培训，一起玩转流量，最大化变现等等。",
            "link":"javascript:;"
        }
    ];

//倒序排序reverse()
// works.reverse();

class Works extends React.Component{
    render(){
        return(
            <div>
                {
                    works.map(function (v,key) {
                        return <div className="item col-sm-6 col-md-4 col-lg-3" key={key}>
                            <div className="thumbnail">
                                <a href={v.link} title={v.title} target="_blank">
                                    <img src={loadingImg} data-src={v.imgs} width="300" height="300" alt="" className="lazy-img" />
                                </a>
                                <div className="caption">
                                    <h3><a href={v.link} title={v.title} target="_blank">{v.title}</a></h3>
                                    <p>{v.text}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }
}
ReactDOM.render(
    <Works/>,
    document.getElementById("works-app")
)

// ----------------------------------------------------------------------------------------------

// 作品集：(功能没问题，只是不够优化：json获取到图片打包问题；先使用上面的静态方法)
// function parseData(d) {
//     //json字符串处理
//     return typeof(d) == 'string' ? JSON.parse(d) : d;
// }
// const worksUrl = 'https://xiexikang.github.io/src/common/json/works.json';
//
// class Works extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             values: [],             //数组数据存储
//         };
//     }
//     componentDidMount() {
//         axios.get(worksUrl)         //访问json
//             .then(res => {
//                 let d = parseData(res.data);
//                 const values = d.works.map(obj=>obj)
//                 // const values = d.works.map(function (obj) {
//                 //     return obj;
//                 // });
//                 this.setState({ values });
//             });
//     }
//
//     render() {
//
//         return (
//             <div>
//                 {
//                     this.state.values.map(function (v) {
//                         return (
//
//                             <div className="item col-sm-6 col-md-4 col-lg-3" key={v.id}>
//                                 <div className="thumbnail">
//                                     <a href={v.link} title={v.title} target="_blank">
//                                         <img src={loadingImg} data-src={v.imgs} width="300" height="300" alt="" className="lazy-img" />
//                                     </a>
//                                     <div className="caption">
//                                         <h3><a href={v.link} title={v.title} target="_blank">{v.title}</a></h3>
//                                         <p>{v.text}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             )
//                     })
//
//                 }
//             </div>
//         );
//     }
// }
//  ReactDOM.render(
//     <Works />,
//     document.getElementById('example')
// );

// 功能：加载完成后显示视图内容
document.onreadystatechange = subSomething;
//加载状态为complete时移除loading效果
function subSomething() {

    if (document.readyState == "uninitialized ") {

        console.log('uninitialized ');



    } else if (document.readyState == "loading") {

        console.log('loading');

    }else if (document.readyState == "interactive") {

        console.log('interactive');

    } else if(document.readyState=="complete"){

        console.log('complete');

        document.getElementsByTagName('body')[0].classList.add('loaded');

        document.getElementById('website-container').style.display = 'block';

    }
}