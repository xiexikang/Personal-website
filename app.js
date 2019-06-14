// -----------------------引入层----------------------------

import './index.html';       //引入这个为了处理.html的图片

import  React from 'react';
import  ReactDOM from 'react-dom';
import $ from 'jquery';
// import Vue from 'vue';
import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
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
    _img15 = require('./src/common/img/dymh-wap.jpg'),
    _img16 = require('./src/common/img/wx-hjdgs.jpg'),
    _img17 = require('./src/common/img/wx-fcmp.jpg'),
    _img18 = require('./src/common/img/wx-hitui.jpg'),
    _img19 = require('./src/common/img/wx-htjyh.jpg'),
    _img20 = require('./src/common/img/xcx-bbll.jpg'),
    _img21 = require('./src/common/img/xcx-xklx.jpg');

// -----------------------方法层----------------------------
//json字符串处理
function parseData(d) {
    return typeof(d) == 'string' ? JSON.parse(d) : d;
}

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

        let box  = document.getElementById("my-banner");
        let ul = box.children[0].children[0];

        let ulLis = ul.children;

        ul.appendChild(ulLis[0].cloneNode(true));

        //窗口可视范围全屏
        $(window).on('resize', function () {
            let liWid = document.body.clientWidth;
            let ulWid = liWid*ulLis.length;
            $('#ul li').width(liWid);
            $('#ul').width(ulWid);
        }).trigger('resize')

        let ol = box.children[1].children[0];

        for(let i=0;i<ulLis.length-1;i++) {

            let li = document.createElement("li");
            li.innerHTML = i + 1;
            ol.appendChild(li);
        }
        let olLis = ol.children;
        olLis[0].className = 'cur';

        for(let i=0;i<olLis.length;i++) {
            olLis[i].index = i;
            olLis[i].onmouseover = function() {
                for(var j=0;j<olLis.length;j++) {
                    olLis[j].className = "";
                }
                this.className = 'cur';

                animate(ul,-this.index*ulLis[0].offsetWidth);

                key = square = this.index;
            }
        }

        let timer = null,
            key = 0,
            square = 0;

        timer = setInterval(autoplay,4000);

        function autoplay() {
            key++;
            if(key > ulLis.length - 1) {

                ul.style.left = 0;
                key = 1;
            }

            animate(ul,-key*ulLis[0].offsetWidth);

            square++;
            square = square>olLis.length-1 ? 0 : square;

            for(let i=0;i<olLis.length;i++) {
                olLis[i].className = "";
            }
            olLis[square].className = "cur";
        }

        box.onmouseover = function() {
            clearInterval(timer);
        }

        box.onmouseout = function() {
            timer = setInterval(autoplay,4000);
        }

        //  基本封装
        function animate(obj,target) {
            clearInterval(obj.timer);
            let speed = obj.offsetLeft < target ? 15 : -15;
            obj.timer = setInterval(function() {
                var result = target - obj.offsetLeft;
                // 动画的原理
                obj.style.left = obj.offsetLeft + speed  + "px";
                if(Math.abs(result) <= 15) {
                    obj.style.left = target + "px";
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

                            {/*<canvas id="buffer"></canvas>*/}
                            {/*<canvas id="canvas"></canvas>*/}

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
        "title":"Photoshop"
    },
    {
        "imgs":_s2,
        "title":"Webstorm"
    },
    {
        "imgs":_s3,
        "title":"Fireworks"
    },
    {
        "imgs":_s4,
        "title":"Html5"
    },
    {
        "imgs":_s5,
        "title":"Css3"
    },
    {
        "imgs":_s6,
        "title":"Sass"
    },
    {
        "imgs":_s7,
        "title":"Vue"
    },
    {
        "imgs":_s8,
        "title":"Javascript"
    },
    {
        "imgs":_s9,
        "title":"Jquery"
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


import worksJson from './src/common/json/works.json'
// console.log(worksJson)

// 作品：
const works = [
        {
            "id":"1001",
            "imgs":_img1,
            "title":"嗨推学院",
            "text":"嗨推学院，专注淘宝客推广，淘宝客教程，淘宝客程序，销售视频教程与学习方法，为广大卖家以及淘宝客提供淘宝推广学习交流平台网站。",
            "link":"http://xue.hitui.com/",
            "type":"pc"
        },
        {
            "id":"1002",
            "imgs":_img2,
            "title":"华诗图官网",
            "text":"华诗图一直致力于软件定制研发事业，深度挖掘用户需求.集计算机软件，app应用，手机软件的开发于一体，为客户提供专业客户端软件技术支持。",
            "link":"http://www.mdkg.net/",
            "type":"pc"
        },
        {
            "id":"1003",
            "imgs":_img3,
            "title":"涂料经销商联盟",
            "text":"涂料经销商联盟，专注服务于涂料行业经销商，以帮助企业构建出一个商务人脉圈，优化和补充销售渠道的目的，社交加电商模式的平台网站。",
            "link":"http://www.ccda360.com",
            "type":"pc"
        },
        {
            "id":"1004",
            "imgs":_img4,
            "title":"北江纺织商城",
            "text":"韶关北江纺织，是一家面料展示平台,是业界领先的牛仔面料生产厂家,专业生产各种优质牛仔面料,各类中高档牛仔面料批发分销的电商平台网站。",
            "link":"http://www.textileapps.com",
            "type":"pc"
        },
        {
            "id":"1005",
            "imgs":_img5,
            "title":"印了吗商城",
            "text":"印了吗商城，是一家照片冲印定制，相册模版编辑，提供各式相册、台历等照片产品的网上冲印和相册模版个性定制服务的B2C电商平台网站。",
            "link":"javascript:;",
            "type":"pc"
        },
        {
            "id":"1006",
            "imgs":_img6,
            "title":"英诺公司官网",
            "text":"英诺科技，是一家提供高品质移动应用解决方案的提供商，专注于移动互联网APP开发，微信开发和提供网络整体解决方案的外包行业企业官网。",
            "link":"http://www.innoo.cn",
            "type":"pc"
        },
        {
            "id":"1007",
            "imgs":_img7,
            "title":"oa分润平台",
            "text":"嗨推学院旗下项目oa分润平台提供给网络推广者，微信微商团队，团队会员管理，团队收支，会员查询，申请团队的会员等级，享受不同的等级服务。",
            "link":"http://bbll.htr.kim/Mobile/index.html",
            "type":"wap"
        },
        {
            "id":"1008",
            "imgs":_img8,
            "title":"社群管理",
            "text":"嗨推学院旗下产品手机版社群管理，专职提高给微信群，微信用户提高数据的采集，配合社群后台管理一起应用，引流加粉推广等服务平台。",
            "link":"http://sq.hitui.cn/",
            "type":"wap"
        },
        {
            "id":"1009",
            "imgs":_img9,
            "title":"北江纺织微商城",
            "text":"微信公众号“北江纺织”，同步PC端网站，是业界领先的牛仔面料生产厂家，专业牛仔面料批发，各种牛仔面料优质供应商的电子商务微商城。",
            "link":"javascript:;",
            "type":"wap"
        },
        {
            "id":"1010",
            "imgs":_img10,
            "title":"采批文具商城",
            "text":"采批文具商城，负责商品零售批发，专注文具、体育用品批发销售领域，为行业生产商，销售商及相关客户提供质优的商品和便捷使用的微商城。",
            "link":"http://51recai.com/",
            "type":"wap"
        },
        {
            "id":"1011",
            "imgs":_img11,
            "title":"清化商会",
            "text":"微信公众号 “清化商会”，主要是在中国广东韶关市的商人与商人、商人与社会之间相互联系的，增加家乡文化与商业交流的社区资讯微官站。",
            "link":"http://www.cnqhsh.com",
            "type":"wap"
        },
        {
            "id":"1012",
            "imgs":_img12,
            "title":"涂料微商城",
            "text":"微信公众号“涂经联新材”，同步涂料经销商PC端网站，以帮助企业构建出一个商务人脉圈，优化和补充销售渠道的目的，社交加电商模式的微商城。",
            "link":"http://www.ccda360.com/wx/index/wxindex.html",
            "type":"wap"
        },
        {
            "id":"1013",
            "imgs":_img13,
            "title":"仲意建材报",
            "text":"微信公众号“仲意建材报”，主要以建材网展，展会预定，电子书刊，活动资讯的发布等待，展示介绍此平台的的相关信息的企业资讯微网站。",
            "link":"http://zyjiancaibao.com/weixin/expoon/index.html",
            "type":"wap"
        },
        {
            "id":"1014",
            "imgs":_img14,
            "title":"嗨推学院",
            "text":"微信公众号“嗨推学院”,专注淘宝客推广，淘宝客教程，淘宝客程序，销售视频教程与学习方法，为广大卖家以及淘宝客提供淘宝推广学习交流平台网站。",
            "link":"http://xue.hitui.com/Mobile/Index/index.html",
            "type":"wap"
        },
        {
            "id":"1015",
            "imgs":_img15,
            "title":"抖音卖货",
            "text":"抖音卖货,专注网店商家与推广者/淘宝客的业务对接，商家上架发布商品，淘客承接订单任务进行抖音-快手-微博等平台进行推广的服务平台网站。",
            "link":"http://doutao.htr.kim/",
            "type":"wap"
        },
        {
            "id":"1016",
            "imgs":_img16,
            "title":"喝酒的故事",
            "text":"微信小程序：喝酒的故事，嗨推公司开发，提供给贵州知酒堂公司，与酒会友，分享自己与酒的点滴故事，不定期举行活动，送正宗贵州茅台酒哦。",
            "link":"javascript:;",
            "type":"xcx"
        },
        {
            "id":"1016",
            "imgs":_img17,
            "title":"发财名片",
            "text":"微信小程序：发财名片，嗨推旗下的小程序，提供给企业/个人的名片，名片大全，名片资源，发财名片还有额外收益，加入战队，边推广边赚钱。",
            "link":"javascript:;",
            "type":"xcx"
        },
        {
            "id":"1018",
            "imgs":_img18,
            "title":"嗨推学院",
            "text":"微信小程序：嗨推学院，学推广，到嗨推，让网络推广变得更简单，专注淘宝客推广，淘宝客教程，为广大淘宝客提供淘宝推广学习交流平台网站。",
            "link":"javascript:;",
            "type":"xcx"
        },
        {
            "id":"1019",
            "imgs":_img19,
            "title":"嗨推精英会",
            "text":"微信小程序：推广精英大咖线下分享，大房间小房间知识操作讨论，共享互利，一一解答问题，实地培训，一起玩转流量，最大化变现等等。",
            "link":"javascript:;",
            "type":"xcx"
        },
        {
            "id":"1020",
            "imgs":_img20,
            "title":"波波来了",
            "text":"波波来了，把讲师录制好的音频与视频挂载在平台上，提供给学员们进行线上购买并学习，还有一些行业大佬的分享及相关的资讯文章等等。",
            "link":"javascript:;",
            "type":"xcx"
        },
        {
            "id":"1021",
            "imgs":_img21,
            "title":"小K旅行",
            "text":"小K旅行，游客分享自己每次的旅行心得，图文-视频的游记，share自己跟亲朋好友的好去处，发现美好的事物，指定旅行的计划和相关攻略。",
            "link":"javascript:;",
            "type":"xcx"
        }
    ];

//作品集
const VueWork = new Vue({
    el:'#vue-workList',
    data(){
        return{
            workList:[], //作品列表
        }
    },
    created(){
        this.getWorkJson();
    },
    methods:{
        getWorkJson(){
            this.workList = works;
            Vue.use(VueLazyload, {
                loading:loadingImg
            })
        }
    }
})


//倒序排序reverse()
// works.reverse();
//
// class Works extends React.Component{
//     render(){
//         return(
//             <div>
//                 {
//                     works.map(function (v,key) {
//                         return <div className="item col-sm-6 col-md-4 col-lg-3" key={key}>
//                             <div className="thumbnail">
//                                 <a href={v.link} title={v.title} target="_blank">
//                                     <img src={loadingImg} data-src={v.imgs} width="300" height="300" alt="" className="lazy-img" />
//                                 </a>
//                                 <div className="caption">
//                                     <h3><a href={v.link} title={v.title} target="_blank">{v.title}</a></h3>
//                                     <p>{v.text}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     })
//                 }
//             </div>
//         )
//     }
// }
// ReactDOM.render(
//     <Works/>,
//     document.getElementById("works-app")
// )

// ----------------------------------------------------------------------------------------------

// 作品集：(功能没问题，只是不够优化：json获取不到图片打包问题；先使用上面的静态方法)

// const worksUrl = 'https://xiexikang.github.io/src/common/json/works.json';
//  const worksUrl = require('./src/common/json/works.json');

// class Works2 extends React.Component {
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
//     <Works2 />,
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



// canvas展示欢迎语
function showWelCanvas(){
    let rid = null,
        frames = 0,
        index = 0,
        fontSize = 70;

    let lines = [],
        points = [];

    let showSpeed = 11;

    const ctx = canvas.getContext("2d"),
        btx = buffer.getContext("2d");

    let bw = (buffer.width = fontSize),
        bh = (buffer.height = fontSize),
        cw = (canvas.width = window.innerWidth),
        ch = (canvas.height = 300);
    btx.fillStyle = ctx.fillStyle = "#fff";
    btx.font = ctx.font = fontSize + "px Courier New";

    let text = [
        "Hello everybody",
        "Wellcome to my home",
        "The website exhibits",
        "Some works and skills",
        "And personal information",
        "Thanks"
    ];

    text.map((t, i) => {
        text[i] = t.toUpperCase();
    });

    class Line {
        constructor(text) {
            this.text = text;
            this.width = ctx.measureText(this.text).width;
            this.startingPoint = -this.width / 2;
            this.letters = [];

            this.lettersRy();
        }

        lettersRy() {
            for (let i = 0; i < this.text.length; i++) {
                let letter = this.text[i];
                let _start =
                    this.startingPoint + ctx.measureText(this.text.substring(0, i)).width;
                let pos = { x: _start, y: (ch - fontSize) / 2 };
                this.letters.push(new Letter(i, pos, letter));
            }
        }
    }

    class Letter {
        constructor(i, pos, letter) {
            this.index = index;
            this.letter = letter;
            this.pos = pos;
            this.points = [];
            this.addToPointsRy();
        }
        addToPointsRy() {
            btx.clearRect(0, 0, bw, bh);
            btx.fillText(this.letter, 2, bh - 2);
            let imgData = btx.getImageData(0, 0, bw, bh);
            let pixels = imgData.data;

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] == 255) {
                    let x = (0.25 * i) % bw;
                    let y = ~~(0.25 * i / bw);
                    this.points.push(new Particle(x + this.pos.x, y + this.pos.y));
                }
            }
        }
    }

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.pos = { x, y };
            this.pn = {
                // positive or negative
                x: Math.random() > 0.2 ? 1 : -1,
                y: Math.random() > 0.2 ? -1 : 1
            };
            this.vel = {
                x: this.pn.x * (this.pn.x + Math.random() * 10) / 90,
                y: this.pn.y * (this.pn.y + Math.random() * 10) / 90,
                alp: (0.1 + Math.random()) / 60
            };
            this.alp = 1;
        }

        draw() {
            ctx.fillStyle = "rgba(255,255,0," + this.alp + ")";
            ctx.beginPath();
            ctx.fillRect(this.pos.x, this.pos.y, 1, 1);
        }

        update() {
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.alp -= this.vel.alp;
        }
    }

    for (let i = 0; i < text.length; i++) {
        lines.push(new Line(text[i]));
    }

    let numLine = 0;
    let line = lines[numLine];

    ctx.translate(cw / 2, 0);
    function Frame() {
        rid = window.requestAnimationFrame(Frame);

        ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch);
        points.map((p, i) => {
            p.update();
            p.draw();
            if (p.alp <= 0) {
                points.splice(i, 1);
            }
        });

        if (frames % showSpeed == 0) {
            line.letters[index].points.map(p => {
                p.pos = { x: p.x, y: p.y };
                p.alp = 1;
            });
            points = points.concat(line.letters[index].points);
            index++;
        }

        if (index == line.letters.length) {
            numLine++;
            line = lines[numLine % text.length];
            index = 0;
            frames = 0;
        }
        frames++;
    }


    function Init() {
        cw = canvas.width = window.innerWidth;
        ctx.translate(cw / 2, 0);
        if (rid) {
            window.cancelAnimationFrame(rid);
            rid = null;
        }
        Frame();
    }

    setTimeout(function() {
        Init();
        window.addEventListener("resize", Init, false);
    }, 10);
}

//showWelCanvas();