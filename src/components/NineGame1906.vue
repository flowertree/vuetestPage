<template>
    <div id="wrap" :style="{background: 'url(' + backgroundImage + ') no-repeat center center', backgroundSize: '100% 100%'}">
        <img :src="head_image_url" class="logoPic">
        <div @click="changeOn" :class="isOff?'isOff':'isOn'">
        </div>
       <audio id="audio" :src="musicSrc"></audio>


        <img :src="activityRuleImg" class="rulePic" @click="showRule">
        <!--<img :src="this.head_image_url" class="rulePic2">-->
        <p class="theTime">活动时间：{{activeTime}}</p>
        <!--<p class="theTime">活动时间：2017-07-01-0217-07-31</p>-->
        <div class="contWrap" style="z-index:1;">
            <div class="redBg1Wrap">
                <img :src="this.rouletteUrl" class="redBg1">
                <!--<img src="../../static/images/nineGame1906/gifStart.gif" class="redBg1">-->
                <div class="redBg2Wrap" ></div>
                <div class="redBg2Wrap">
                    <ul class="overHide" id="redBg2Wrap" style="height:100%;position: relative;">
                       <li class="nineLi" style="position:absolute;top:0;left:0;">
                           <img :src="firstGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                      </li>
                      <!--<img :src="this.currentImage" class="drawBtn" @click="drawBtn">//抽奖按钮-->
                       <li class="nineLi" style="position: absolute;top: 0;left: 34%;">
                           <img :src="secondGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                       <li class="nineLi" style="position: absolute;top: 0;right:0;">
                           <img :src="thirdGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                       <li class="nineLi" style="position: absolute;top: 34%;right:0;">
                           <img :src="thanksGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                        <div class="togo" id="togoClick" @click="drawBtn"  :style="{background: 'url(' + beginImageUrl + ') no-repeat center center',backgroundSize: '100% 100%', position: 'absolute',top: '34%',left: '34%',width: '32%',height: '32%',border:' none',outline: 'none',}"></div>
                       <!--<button class="togo" id="togoClick" @click="drawBtn" style="position: absolute;top: 34%;left: 34%;width: 32%;height: 32%;background-color: transparent;border: none;outline: none;background-size:100% 100%;border-radius:6px;"></button>'-->
                       <li class="nineLi" style="position: absolute;bottom: 0;right:0;">
                           <img :src="sixGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                       <li class="nineLi" style="position: absolute;bottom: 0;left: 34%">
                           <img :src="fiveGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                       <li class="nineLi" style="position: absolute;bottom: 0;left: 0;">
                           <img :src="fourGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                       <li class="nineLi" style="position: absolute;left: 0;top: 34%">
                           <img :src="thanksGiftImg" class="giftPic">
                           <p class="giftNum">谢谢参与</p>
                       </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="stateWrap">
            <p class="stateP" v-show="allNumsshow">已经有<span>{{numbers}}</span>人参与</p>
            <!--<p class="stateP" v-show="allNumsshow">已经有<span>4399</span>人参与</p>-->
            <p class="stateP">您今天还有<span>{{user_times}}</span>次抽奖机会</p>
        </div>
        <!--录入客户信息弹框-->
        <div class="mesMask" v-show="inpShow">
         <div class="mesInp">
            <div class="mesN">
                <img :src="inpGift"  class="inpGift">
                <ul class="inpList">
                    <li>
                        <div class="circelR"></div>
                        <p class="labels">姓名</p>
                        <input v-model="receiver" type="text" class="inps" placeholder="请输入姓名">
                        </li>
                    <li>
                        <div class="circelR"></div>
                        <p class="labels">图形码</p>
                        <input type="text" name="vercode" placeholder="请输入图形验证码" class="inps2" v-model="picLyanzhengma"/>
                        <span class="codeImg">
	                    <img :src="codeUrl" id="authIg" title="点击换一张" @click="getAuthImg"/></span>
                        </li>
                    <li>
                        <div class="circelR"></div>
                        <p class="labels">手机号</p>
                        <input v-model="phoneNumber" type="tel" class="inps2" placeholder="请输入手机号码" maxlength="11">
                        <button class="yzBtn" id="yzBtn" @click="sendVerificationCode">验证</button>
                        </li>
                    <li>
                        <div class="circelR"></div>
                        <p class="labels">验证码</p>
                        <input type="text" id="VerificationCode" class="inps" placeholder="请输入短信验证码">
                        </li>
                    <li class="btnWraps">
                          <div class="chodeBtn floatL"  id="getMesSureBtn" @click="saveActivityCustomer">确认</div>
                          <div class="chodeBtn floatR" @click="cancleInpBtn">取消</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--录入客户信息弹框结束-->
        <!-- 活动规则 -->
        <div class="ruleWrap" v-show="ruleMaskShow">
            <div class="ruleBox">
                <img src="../../static/images/nineGame1906/ruleClose.png" class="ruleClose" @click="closeRule">
                <ul class="ruleUl">
                    <li @click="activeSta">
                        <span>活动说明</span>
                        <img src="../../static/images/nineGame1906/liUnder.png" class="liUnder" v-show="activeUnd">
                        </li>
                    <li @click="myGift">
                        <span>我的奖品</span>
                        <img src="../../static/images/nineGame1906/liUnder.png" class="liUnder" v-show="giftUnd">
                        </li>
                    </ul>
                <div class="ruleCont">
                    <!-- 活动说明li -->
                    <div class="hdsmWrap" v-show="activeUnd">
                         <div class="overHide">
                                 <div class="someTit">活动奖品</div>
                         </div>
                         <div class="statPWrap">
                                 <p class="someSta">一等奖：价值100元礼品</p>
                                 <p class="someSta">二等奖：价值100元礼品</p>
                                 <p class="someSta">三等奖：价值100元礼品 </p>
                                 <p class="someSta">四等奖：价值100元礼品</p>
                         </div>
                         <div class="overHide">
                            <div class="someTit">活动时间</div>
                         </div>
                         <div class="statPWrap">
                            <p class="someSta">{{activeTime2}}</p>
                            <!--<p class="someSta">2019年5月10日 11:20- 2019年5月30日 11:20</p>-->
                         </div>
                        <!-- <div class="overHide">-->
                            <!--     <div class="someTit">主办单位</div>-->
                            <!--     </div>-->
                        <!-- <div class="statPWrap">-->
                            <!--     <p class="someSta">本次活动主办单位为<a class="names">中意人寿</a></p>-->
                            <!--     </div>-->
                        <div class="overHide">
                            <div class="someTit">活动说明</div>
                            </div>
                        <div class="statPWrap">
                            <!--<p class="someSta">{{description}}</p>-->
                            <p class="someSta">达到80分即可获得抽奖机会，每人每日有3次抽奖机会。</p>
                            </div>
                        </div>
                       <!-- 我的奖品li -->
                        <div class="myGift" v-show="giftUnd">
                            <div class="overHide" id="giftListWrap">
                            <!-- <div class="someTit">我的奖品</div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <!-- 活动规则结束 -->
        <!-- 中奖了弹框-->
        <div class="getGift" v-show="getGiftMask">
            <div class="getCont">
                <div class="zjbjWrap" id="zjbjWrap" >
                        <div class="lpj">
                            <div class="inner">
                                <!--<p>“恭喜您抽中10元京东卡,</p>-->
                                <!--<p>请登录京东商城凭借密码兑换”</p>-->
                                <p>“恭喜您抽中10元京东卡,请登录京东商城凭借密码兑换”</p>
                                <p class="inner2">卡号：10100000111111111111</p>
                                <p>密码：121dswe2323</p>
                            </div>
                        </div>
                        <img src="../../static/images/nineGame1906/zjBox.png" class="getTk">
                        <div class="wzjBtn zjBot" @click="againBtn">再来一次</div>
                </div>
            </div>
         </div>
        <!-- 中奖了弹框结束 -->
        <!-- 未中奖弹框 -->
        <div class="wzjTk" v-show="notGiftMask">
             <p class="kxP">可惜！差点就中奖了</p>
             <p class="againP">再试一次吧～</p>
            <!--<img :src="this.no_winning_pictures" class="mzjKid">-->
            <img src="../../static/images/nineGame1906/mzjKid2.png" class="mzjKid">
            <div class="wzjBtn marBot" @click="againBtn">再来一次</div>
            <!-- <div class="wzjBtn">关注我们</div>-->
            </div>

        <!-- 没活动弹框 -->
        <div v-show="notActive" style="color:#fff;font-size:24px;height:100%;width:100%;position:fixed;top:0;left:0;z-index:3;background:rgba(0,0,0,0.7)"><p style="position:fixed;top:50%;width:100%;text-align:center;">{{notactiveState}}</p></div>
        <!-- 没活动弹框结束 -->
    </div>
</template>
<script>
    // 类似于ajax
    import axios from 'axios';
//    给后台传对象或者数组的时候防止乱码使用
    import qs from 'qs'; // cnpm  qs
    import { Toast,Indicator } from 'mint-ui';//引用的插件
    import config from "../../config/global";
    export default {
        name:'toast',
        data() {
            return {
                config:config.project_name, //配置接口环境
                isOff:true,//音乐关闭
                musicSrc: '',
                notActive:false,
                notactiveState:'加载中，请稍后 ',
                indexs:0,
                jubgeAgent: '', //判断代理人的标识：1代理人；0不是代理人
                openid:'ouih2uyHmpkayR6Bsbol',
                userId:'',
                baseUrl:'https://www.gconline.cn/wechatprodtest',
                activityId:'[8E1427FF29BFB66913BE38F5A3D33487]',
                mark:'',
                backImgUrl:'',//页面背景图
                rouletteUrl:require('../../static/images/nineGame1906/gifStart.gif'),//跑马灯图片
                beginImageUrl:require('../../static/images/nineGame1906/togo.png'),//开始抽奖按钮
                backgroundUrl:'',//各个奖项li的背景图
                head_image_url:require('../../static/images/nineGame1906/activeLogo.png'),//头部背景图（中意大抽奖）
                winning_pictures:'',//中奖背景图
                winning_box_pictures:'',//中奖礼品盒子图片
                no_winning_pictures:'',//未中奖背景图
                activityRuleImg:require('../../static/images/nineGame1906/activeRule.png'),//活动规则图片
                backgroundImage:require('../../static/images/nineGame1906/bg.png'), //活动背景图 //background: url("../../static/images/nineGame1906/bg.png") no-repeat;
                firstGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //一等奖图片
                secondGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //二等奖图片
                thirdGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //三等奖图片
                fourGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //四等奖图片
                fiveGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //五等奖图片
                sixGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //六等奖图片
                thanksGiftImg:require('../../static/images/nineGame1906/twoGift.png'), //谢谢参与
                inpGift:require('../../static/images/nineGame1906/inpGift.png'), //谢谢参与
                firstData:[],
                secondtData:{},
                thirdData:{},
                fourData:{},
                imgData:{},
                carnumData:{},
                myGiftData:{},
                safeStyleData:{},
                flowJudgeData:{},
                activeTime:'',
                description:'',//活动的介绍主要用于展示活动的说明功能
                activeUnd:true,//活动规则展示
                giftUnd:false,//活动奖品展示
                ruleMaskShow:false,//活动规则弹框显示
                single_times:0,
                allNumsshow:true,//是否显示活动参与人数：1是，0否
                is_display:'',
                currentImage:'',
                user_times:5,//当前用户的剩余抽奖次数
                numbers:0,//当前活动的参与用户
                receiver:'', //客户姓名
                picLyanzhengma:'', //验证码
                phoneNumber:'',
                userCode:'80000022',
                fivedData:[],
                drawBack:{},
                giftList:[],
                num:6,//中奖的角标
                winningState:2,
                notGiftMask:false,//未中奖弹框显示隐藏
                getGiftMask:false,//中奖弹框显示隐藏
                giftLevel:'',//中了几等奖
                activityGiftid:'',//奖品id
                prizeId:'',//奖项id
                RollBACK:0,//是否回滚的标识
                getMaskState:'',//中奖话术
                activityGiftDetail:[],
                gift_code:'',
                card_password:'',
                flow:'',
                giftInsurance_Url:'',
                gift_type:'',//奖品类型
                myGiftList:[],
                userType:'',//赠险类型
                message:'',//流量充值成功与否
                flowState:'',//流量充值话术
                activeTime2:'',
                winning_describeMask:'',
                agent_is_allowed:2 ,//公司员工抽奖
                addMorePeople:0 , //虚拟增加人数
                jumpUrl:'', //强制跳转链接
                addDrawNum:'',//分享增加抽奖次数
                inpShow:false, //是否录入客户信息
                //codeUrl:'https://www.gconline.cn/wechatol/code/smsGetCode.do', //生产 验证码图片更换地址
                codeUrl:'http://localhost:8081/gcol-online/code/smsGetCode.do',  //本地测试
                drawWay:0, //抽奖方式  默认固定次数抽奖  0 固定次数抽奖 1 分级别抽奖
                loadList:[
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 1
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 2
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 3
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 4
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 5
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 6
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 7
                    },
                    {
                        "prize": "谢谢参与",
                        "prize_image_url": "images/activityDraw/twoGift.png",
                        "position_number": 8
                    }
                ],
            }

        },
        methods:{
            //上传
            changeImg(){
                var _this = this;
                alert(1)
                var formData = new window.FormData()
                formData.append('fileUploadCmd.file', $('#file').val())
                formData.append('fileUploadCmd.filePath','new_activity')
                alert(formData)
                let param = new window.FormData();
                param.append('fileUploadCmd.file', $('#file').val())
                param.append('fileUploadCmd.filePath','new_activity')
                this.$http.post('http://localhost:8080/gconline/FileUploadAction!upload.action', param, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        "Access-Control-Allow-Origin":"http://localhost:8080"
                    }
                }).then((res) => {
                    console.log("上传文件返回",res)
                })
                    .catch(error => {
                        this.$Message.error(error.message);
                    });
            },
            //立即分享
            lkfx(){
                $(".covers1").hide();
                //显示分享
                wx.showOptionMenu();
                sessionStorage.setItem("total",this.newcovers1.data.total);
                this.fenxiang=this.newcovers1.data.data;
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:qq', //分享到QQ
                        'menuItem:share:weiboApp', // 分享到Weibo
                        'menuItem:favorite', // 收藏
                        'menuItem:share:QZone', // 分享到 QQ 空间
                        'menuItem:copyUrl', // 复制链接
                        'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                        'menuItem:openWithSafari', // 在Safari中打开
                        'menuItem:share:email', // 邮件
                        'menuItem:readMode', // 阅读模式
                        'menuItem:originPage', // 原网页
                        'menuItem:share:timeline' //分享到朋友圈
                    ],
                });
                wx.onMenuShareAppMessage({
                    title: 'e签约邀请函',
                    desc: '欢迎加盟中意人寿，愿您同中意一同成长。',
                    link: this.config+'PrepAgentInfoController/jumpPage.do?invitation='+this.newcovers1.data.data,
                    imgUrl:this.config+'images/prepAgentInfo/fx_logos.png',
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {

                    },
                    cancel: function () {
                    }
                });

                $(".ButtonSending").css("background","#b1b1b1")
                $(".covers").css("display","block");
            },
            // 分享方法
            sharePlan() {
                var urlStr = window.location.href.split('#')[0];
                console.log("分享方法",urlStr);
                urlStr = encodeURIComponent(urlStr);
                //获取签名串
                var _that = this;
                this.$http.get(_that.config + '/gameCustomerController/shareGame.do?urlStr=' + urlStr).then((res) => {
                        // 请求成功的回调
                        var data = res.data;
                        let result = JSON.parse(JSON.parse(data));
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: result.appid, // 必填，公众号的唯一标识
                            timestamp: result.timestamp, // 必填，生成签名的时间戳
                            nonceStr: result.noncestr, // 必填，生成签名的随机串
                            signature: result.signature,// 必填，签名，见附录1
                            jsApiList: [ //必填，需要使用的JS接口列表
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'hideMenuItems',
                                'showMenuItems'
                            ]
                        });
                        wx.ready(function () {
                            //批量显示菜单项
                            wx.showMenuItems({
                                menuList: [
                                    "menuItem:share:appMessage",
                                    // "menuItem:share:timeline",
                                    // 'menuItem:share:qq', //分享到QQ
                                    // 'menuItem:share:weiboApp', // 分享到Weibo
                                    'menuItem:favorite', // 收藏
                                    // 'menuItem:share:QZone', // 分享到 QQ 空间
                                    // 'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                                    'menuItem:originPage', // 原网页
                                ], // 要显示的菜单项
                                success: function (res) {

                                },
                                fail: function (res) {
                                }
                            });
                            // 隐藏分享
                            wx.hideOptionMenu();
                            // 批量隐藏菜单项
                            wx.hideMenuItems({
                                menuList: [
                                    'menuItem:share:qq', //分享到QQ
                                    'menuItem:share:weiboApp', // 分享到Weibo
                                    'menuItem:favorite', // 收藏
                                    'menuItem:share:QZone', // 分享到 QQ 空间
                                    'menuItem:copyUrl', // 复制链接
                                    'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                                    'menuItem:openWithSafari', // 在Safari中打开
                                    'menuItem:share:email', // 邮件
                                    'menuItem:readMode', // 阅读模式
                                    'menuItem:originPage', // 原网页
                                    'menuItem:share:timeline' //分享到朋友圈
                                ],
                                success: function (res) {
                                },
                                fail: function (res) {
                                }
                            });
                            //分享给朋友
                            var gobaseUrl = _that.config;
                        });
                        wx.error(function (res) {
                            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                            //alert("error==" + res.errMsg);
                        });
                    }, (err) => {
                        // 请求失败的回调
                        console.log("获取签名串出错！" + err);
                    }
                );
            },
            //输入客户信息取消弹框
            cancleInpBtn:function(){
                this.inpShow = false;
            },
            //发送手机验证码
            sendVerificationCode(){
                var _this = this;
                var wait=60;
                //发送验证码
                var phoneNumberStar = _this.phoneNumber.substr(0,1)
                if(_this.receiver !=''&&_this.phoneNumber!='' &&_this.phoneNumber.length==11 && phoneNumberStar==1&&_this.picLyanzhengma!=''){
                    _this.receiver = escape(_this.receiver)
                    _this.receiver = unescape(_this.receiver)
                    //开始计时
                    time();
                    _this.$http.get(_this.config+'/newActivityDrawController/verificationCode.do?receiver='+encodeURI(encodeURI(_this.receiver))+'&phoneNumber='+_this.phoneNumber+'&userCode='+_this.userCode+'&picLyanzhengma='+_this.picLyanzhengma).then(function(res){
                        var data = JSON.parse(JSON.parse(res.data))
                        console.log("发送验证码",data)
                        _this.JCodeResult = data.result
                        if(_this.JCodeResult == 0) {
                            alert("图形码错误")
                        }
                        if(data.code == 1){
                            _this.JPhoneCode = data.content;
                        }
                    },function(res){
                        console.log(res)
                    })
                }
                else if(_this.receiver ==''){
                    alert("请输入您的姓名")
                } else if(_this.picLyanzhengma == '' || _this.picLyanzhengma.length != 4) {
                    alert("请输入正确的图形码")
                }else if(_this.phoneNumber =='' || _this.phoneNumber.length != 11){
                    alert("请输入正确的手机号")
                }
                //定时60秒
                function time() {
                    var o = $("#yzBtn");
                    if (wait == 0) {
                        o.attr("onclick", "sendVerificationCode()");
                        o.attr("disabled",false)
                        wait = 60;
                        o.html("验证");
                    } else {
                        o.removeAttr("onclick");
                        o.attr("disabled",true)
                        o.html(wait + "s");
                        wait--;
                        setTimeout(function () {
                                time();
                            },
                            1000);
                    }
                }
            },
            //保存客户信息
            saveActivityCustomer(){
                    this.picLyanzhengma.toUpperCase();//取得输入的验证码并转化为大写
                    var _this = this;
                    var phoneNumberStar = _this.phoneNumber.substr(0,1)
                    _this.VerificationCode = document.getElementById("VerificationCode").value
                    if(_this.picLyanzhengma!=''&&_this.receiver !=''&&_this.phoneNumber!='' &&_this.phoneNumber.length==11 && phoneNumberStar==1 && _this.message==0 && _this.JPhoneCode!='' && _this.JPhoneCode==_this.VerificationCode){
                        document.getElementById("getMesSureBtn").classList.add('divMustnotClick');
                        alert(this.single_times)
                        _this.$http.get(this.config + '/newActivityDrawController/saveActivityCustomer.do?userCode='+_this.userCode+'&activityId='+_this.activityId+'&single_times='+_this.single_times+'&phoneNumber='+_this.phoneNumber+'&receiver='+encodeURI(encodeURI(_this.receiver))+'&openid='+_this.openid+'&VerificationCode='+_this.VerificationCode+'&divide='+_this.activity_Divide+'&activityName='+encodeURI(encodeURI(_this.activityName))+'&drawWay='+_this.drawWay).then(function(res){
                            var data = JSON.parse(JSON.parse(res.data))
                            console.log("保存客户信息",data)
                            _this.jubgeAgent = data.jubgeAgent
                            _this.message = data.message
                            _this.userId = data.id
                            if(_this.message=="0"){
                                if(_this.jubgeAgent=="1"){
                                    if(_this.agent_is_allowed==0){
                                        _this.notactiveState = "公司员工不参与抽奖";
                                        _this.notActive = true;
                                    } else{
                                        _this.numbers++;
                                        _this.inpShow = false;
                                    }
                                }else{
                                    _this.numbers++;
                                    _this.inpShow = false;
                                }

                            }else{
                                _this.notactiveState = "信息录入失败";
                                _this.notActive = true;
                            }
                            console.log("userId")
                        },function(res){
                        })
                    } else if(_this.receiver ==''){
                        alert("请输入您的姓名")
                    } else if(_this.phoneNumber==''){
                        alert("请输入联系信息，方便中奖后联系您兑奖 ")
                    } else if(_this.phoneNumber.length<11){
                        alert("请输入正确的手机号")
                    } else if(phoneNumberStar!=1 ){
                        alert("请输入正确的手机号")
                    }else if(_this.picLyanzhengma == '') {
                        alert("图形码为空，请重新输入")
                    }else if(_this.message ==1){
                        alert("验证码不正确")
                    } else if(_this.message ==2){
                        alert("验证码超时")
                    } else if(_this.VerificationCode==''){
                        alert("验证码不能为空")
                    } else if(_this.JPhoneCode!=_this.VerificationCode){
                        alert("验证码有误")
                    }
                },
            //更换验证码图片
            getAuthImg(){
                var _this = this;
                this.codeUrl = _this.codeUrl+ '?date=' + new Date();
            },
            //从链接中获取从传过来的openid
            getOPenId(){
                var url = location.search; //获取url中"?"符后的字串
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for(var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                    }
                }
                this.openid = theRequest.openId;
                this.activityId=theRequest.activityId;
                this.userCode=theRequest.userCode;
                this.mark=theRequest.mark;
                //如果链接中没有带openid则去微信授权获取用户的openid
                if(!this.openid){
                    var ua = window.navigator.userAgent.toLowerCase();
                    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                        //var redirectUrl = this.baseUrl+"/activityDrawController/jumpActivityBase$activityId=614"+"|userCode=80000022"+"|mark=user";
                        //var redirectUrl = this.baseUrl+"/activityDrawController/returnActivityDraw.do$activityId="+this.activityId+"|userCode="+this.userCode+"|mark=user";
                        var redirectUrl = this.baseUrl+"/nineGet.html$activityId="+this.activityId+"|userCode="+this.userCode+"|mark=user";
                        var url ='http://www.generalichina.com/cschat/router/linker.wdo?action=linkto&otlink='+redirectUrl;
                        window.location.href = url;
                        return;
                    }
                }else{
                    this.sharePlan();//分享
                }
            },
            // 页面初始化
            firstJk(){
                var _this = this;
                //活动抽奖配置信息 / 活动配置信息
                axios.get(_this.config+'/newActivityDrawController/queryActivityBase.do?activityId='+_this.activityId).then(function(res){
                    console.log(JSON.parse(res.data),'活动抽奖配置信息')
                    _this.firstData = JSON.parse(res.data)
                    _this.activityName = _this.firstData[0].activityName;
                    _this.activity_Divide = _this.firstData[0].activity_Divide;
                    _this.agent_is_allowed = _this.firstData[0].agent_is_allowed;
                    _this.addMorePeople = _this.firstData[0].addMorePeople;
                    _this.jumpUrl = _this.firstData[0].jumpUrl;
                    _this.addDrawNum = _this.firstData[0].addDrawNum;
                    _this.drawWay = _this.firstData[0].drawWay;

                    // 活动时间
                    var date = new Date(_this.firstData[0].startDate);
                    console.log(date)
                    var year = date.getFullYear();
                    var month = date.getMonth()+1;    //js从0开始取
                    var date1 = date.getDate();
                    var startTime=year+"/"+month+"/"+date1;
                    var startTime2=year+"年"+month+"月"+date1+"日";
                    console.log(startTime)

                    var enddate = new Date(_this.firstData[0].endDate);
                    var endyear = enddate.getFullYear();
                    var endmonth = enddate.getMonth()+1;    //js从0开始取
                    var enddate1 = enddate.getDate();
                    var endTime=endyear+"/"+endmonth+"/"+enddate1;
                    var endTime2 =endyear+"年"+endmonth+"月"+enddate1+"日";
                    _this.activeTime = startTime+"-"+endTime;
                    _this.activeTime2 = startTime2 +"-"+ endTime2;

                    var datatimeStart = Date.parse(_this.firstData[0].startDate);
                    var datatimeEnd = Date.parse(_this.firstData[0].endDate);
                    var curDatetime = Date.parse(new Date());
                    if(datatimeStart>curDatetime){
                        _this.notactiveState = '活动未开始'
                        _this.notActive = true;
                    }
                    if(curDatetime>datatimeEnd){
                        _this.notactiveState = '活动已结束'
                        _this.notActive = true;
                    }
                    if(datatimeStart<curDatetime&&curDatetime<datatimeEnd){
                        _this.notActive = false;
                    }
                    //是否显示活动参与人数：1是，0否
                    _this.is_display = _this.firstData[0].is_display;
                    if(_this.is_display == 1){
                        _this.allNumsshow = true;
                    }else{
                        _this.allNumsshow = false;
                    }
                    //活动配置的每个人可抽奖次数
                    _this.single_times = _this.firstData[0].single_times;
                    //活动的介绍主要用于展示活动的说明功能
                    _this.description = _this.firstData[0].description;
                }, function(res){
                    console.log(res)
                })
                //查询当前活动的图片
                axios.get(_this.config+'/newActivityDrawController/queryActivityImg.do?activityId='+_this.activityId).then(function(res){
                    _this.imgData = JSON.parse(res.data);
                    console.log( _this.imgData,'活动附件信息');
                    var filelen = _this.imgData.length;
                    for(var i=0;i<filelen;i++) {
                        //7 活动背景音乐
                        if (_this.imgData[i].fileIndex == 7) {
                            _this.musicSrc = _this.imgData[i].requestUrl;
                        }
                        //8 活动标题图
                        if (_this.imgData .fileIndex == 8) {
                            _this.head_image_url = _this.imgData[i].requestUrl;
                        }
                        //9 跑马灯背景图
                        if (_this.imgData[i].fileIndex == 9) {
                            _this.rouletteUrl = _this.imgData[i].requestUrl;
                        }
                        //10 活动规则图片
                        if (_this.imgData[i].fileIndex == 10) {
                            _this.activityRuleImg = _this.imgData[i].requestUrl;
                        }
                        //11 活动背景图
                        if (_this.imgData[i].fileIndex == 11) {
                            _this.backgroundImage = _this.imgData[i].requestUrl;
                        }
                        //12 开始抽奖图片
                        if (_this.imgData[i].fileIndex == 12) {
                            _this.beginImageUrl = _this.imgData[i].requestUrl;
                        }

                    }
                }, function(res){
                    console.log(res)
                })
                //当前活动的参与用户
                axios.get(_this.config+'/newActivityDrawController/queryCustomerTotal.do?activityId='+_this.activityId).then(function(res){
                    _this.secondtData = JSON.parse(res.data);
                    console.log( _this.secondtData,'参与用户数据')
                    var num = _this.addMorePeople
                    _this.numbers = _this.secondtData.number + num;
                }, function(res){
                    console.log(res)
                })
                //当前用户的剩余抽奖次数
                axios.get(_this.config+'/newActivityDrawController/queryActivityUserRemaining.do?activityId='+_this.activityId+'&openid='+_this.openid).then(function(res){
                    _this.thirdData =JSON.parse(res.data);
                    console.log(_this.thirdData,'当前用户的剩余抽奖次数数据')
                    console.log(_this.thirdData.remain_times,'当前用户的剩余抽奖次数')
                    axios.get(_this.config+'/newActivityDrawController/queryActivityBase.do?activityId='+_this.activityId).then(function(res){
                        var singleData =JSON.parse(res.data);
                        _this.userId = _this.thirdData.userId;
                        if(_this.thirdData.remain_times == -1){
                            _this.inpShow = true;
                            _this.user_times =  singleData[0].single_times;
                        }else{
                            _this.userId = _this.thirdData.userId;
                            _this.inpShow = false;
                            _this.user_times = _this.thirdData.remain_times;
                        }
                    }, function(res){
                        console.log(res)
                    })
                }, function(res){
                    console.log(res)
                })
                //奖项信息
                axios.get(_this.config+'/newActivityDrawController/queryActivityGift.do?activityId='+_this.activityId).then(function(res){
                    console.log(JSON.parse(res.data),"奖项信息")
                    _this.fivedData = JSON.parse(res.data);
                    _this.giftList = _this.fivedData;//获取到的奖品信息列表
                    var giftLen = _this.giftList.length;
                    var lis = document.getElementsByClassName("nineLi");//所有li，数组
                    var prizeStr;
                    var prizeUrl;
                    for(var i=0;i<giftLen;i++) {//转换奖品数码
                            if (_this.giftList[i].prize == 'A') {
                                prizeStr = '一等奖',
                                prizeUrl = _this.imgData[0].requestUrl;
                                _this.giftList[i].prize = '一等奖';
                            }
                            if (_this.giftList[i].prize == 'B') {
                                prizeStr = '二等奖',
                                prizeUrl = _this.imgData[1].requestUrl;
                                _this.giftList[i].prize = '二等奖';
                            }
                            if (_this.giftList[i].prize == 'C') {
                                prizeStr = '三等奖',
                                prizeUrl = _this.imgData[2].requestUrl;
                                _this.giftList[i].prize = '三等奖';
                            }
                            if (_this.giftList[i].prize == 'D') {
                                prizeStr = '四等奖',
                                prizeUrl = _this.imgData[3].requestUrl;
                                _this.giftList[i].prize = '四等奖';
                            }
                            if (_this.giftList[i].prize == 'E') {
                                prizeStr = '五等奖',
                                prizeUrl = _this.imgData[4].requestUrl;
                                _this.giftList[i].prize = '五等奖';
                            }
                            if (_this.giftList[i].prize == 'F') {
                                prizeStr = '六等奖',
                                prizeUrl = _this.imgData[5].requestUrl;
                                _this.giftList[i].prize = '六等奖';
                            }
                            //判断奖品摆放位置
                            if(_this.giftList[i].position_number == 1){
                                _this.indexs = 0
                            }
                            if(_this.giftList[i].position_number == 2){
                                _this.indexs = 1
                            }
                            if(_this.giftList[i].position_number == 3){
                                _this.indexs = 2
                            }
                            if(_this.giftList[i].position_number == 4){
                                _this.indexs = 7
                            }
                            if(_this.giftList[i].position_number == 5){
                                _this.indexs = 3
                            }
                            if(_this.giftList[i].position_number == 6){
                                _this.indexs = 6
                            }
                            if(_this.giftList[i].position_number == 7){
                                _this.indexs = 5
                            }
                            if(_this.giftList[i].position_number == 8){
                                _this.indexs = 4
                            }
                        //添加数组
                        _this.loadList.splice(_this.indexs,1,_this.giftList[i]);
                        lis[_this.indexs].innerHTML = '<img src="'+prizeUrl+'" class="giftPic">'
                            +'<p class="giftNum">'+prizeStr+'</p>'
                    }
                    console.log(_this.loadList,"奖项数组")
                }, function(res){
                    console.log(res)
                })
            },
            //点击开始抽奖
            drawBtn(){
                var _this = this;
                console.log(_this.user_times)
                if(_this.agent_is_allowed == 0 && _this.jubgeAgent=="1"){
                    _this.notactiveState = "公司员工不参与抽奖";
                    _this.notActive = true;
                    return;
                }
                if(_this.userId == -1){
                    alert("您没有抽奖资格");
                    return;
                }
                if(_this.userId == -1){
                    _this.inpShow = true;
                    return;
                }
                _this.user_times--;
                if(_this.user_times<0){//抽奖次数用完啦
                    _this.user_times = 0;
                    alert("抽奖次数用完啦")
                    return;
                }else{//还能抽奖
                    document.getElementById("togoClick").setAttribute("disabled",true);
                    //http://rap2api.taobao.org/app/mock/5408/GET/activityDrawApiController/activityLuckDraw   中奖信息
                    axios.get(this.config + '/newActivityDrawController/activityLuckDraw.do?activityId='+_this.activityId+'&userCode='+'80300088'+'&openid='+'ouih2uyHmpkayR6Bsbol'+'&purchaseRecord=1&userId='+_this.userId).then(function(res) {
                        _this.drawBack = JSON.parse(res.data);
                        console.log(_this.drawBack,'中奖信息')
                        console.log(_this.userId,'用户id')
                        _this.winning_describeMask = _this.drawBack.winning_describe;
                        _this.winningState = _this.drawBack.winningState;//中奖状态：0未中奖；1中奖
                        _this.giftLevel = _this.drawBack.giftLevel;//中了几等奖
                        _this.activityGiftid = _this.drawBack.activityGiftid;//奖品id
                        _this.prizeId = _this.drawBack.prizeId;//奖项id
                        _this.RollBACK = _this.drawBack.RollBACK;//是否回滚的标识：1回滚表示奖品已使用；4奖品保存失败；3该奖项奖品已抽完；2修改使用次数和剩余次数失败；5代理人次数用完回滚
                        _this.gift_type = _this.drawBack.gift_type;//奖品类型
                        if(_this.giftLevel == 'A'){
                            _this.giftLevel = '一等奖'
                        }
                        if(_this.giftLevel == 'B'){
                            _this.giftLevel = '二等奖'
                        }
                        if(_this.giftLevel == 'C'){
                            _this.giftLevel = '三等奖'
                        }
                        if(_this.giftLevel == 'D'){
                            _this.giftLevel = '四等奖'
                        }
                        if(_this.giftLevel == 'E'){
                            _this.giftLevel = '五等奖'
                        }
                        if(_this.giftLevel == 'F'){
                            _this.giftLevel = '六等奖'
                        }

                        var allIndex = [];
                        var noGift = [];

                       for(var i=0;i< _this.loadList.length;i++){
                            //获取页面展示的奖项
                            if(_this.loadList[i].prize == _this.giftLevel){
                                allIndex.push(i);
                            }
                        }

                        var allIndexLen = allIndex.length;
                        var lightIndex = Math.floor(Math.random()*allIndexLen);

                        if(_this.winningState == '1'){
                            _this.num = allIndex[lightIndex]+8*3+1;//随机点亮中奖位置
                        }else{
                            //_this.num = 9;//随机点亮位置
                            for(var i=0;i< _this.loadList.length;i++){
                                if(_this.loadList[i].prize == '谢谢参与'){
                                    noGift.push(i);//不是奖的地方
                                }
                            }
                            var noGiftLen = noGift.length;//6
                            var lightIndex2 = Math.floor(Math.random()*noGiftLen);
                            _this.num = noGift[lightIndex2]+8*3+1;
                        }



                        var i = 0;//点亮角标
                        var timer = null;//延时器
                        var lis = document.getElementsByClassName("nineLi");//所有li，数组
                        var detailWrap = document.getElementById("detailWrap"); //卡券根据接口内容改变
                        var that = _this;
                        // alert("winningState:::"+_this.winningState)
                        timer = setInterval(function(){
                            for(var j=0;j<lis.length;j++){
                                lis[j].classList.remove("trans");
                            }
                            lis[i%lis.length].classList.add('trans');
                            i++;

                            if(i == that.num){
                                if(that.winningState == 1){//中奖情况
                                    //查询卡号密码 http://rap2api.taobao.org/app/mock/5408/GET/activityDrawApiController/queryActivityCodePw
                                    axios.get('http://localhost:8081/gcol-online/newActivityDrawController/queryActivityCodePw.do?giftId='+JSON.parse(res.data).activityGiftid+'&openid='+that.openid+'&activityId='+that.activityId).then(function(res) {
                                        that.carnumData = JSON.parse(res.data);
                                        console.log(JSON.parse(res.data))

                                        that.activityGiftDetail = that.carnumData.activityGiftDetail;
                                        console.log(that.activityGiftDetail)
                                        if(that.gift_type == 'G'){
                                            that.gift_code = that.activityGiftDetail.gift_code;//卡号、兑奖码
                                            detailWrap.innerHTML = '<p class="gxGift" style="line-height:4.5rem;">'+ that.winning_describeMask+'</p><p class="gxGift" style="line-height:4.5rem;">兑奖号：'+that.gift_code+'</p>';
                                        }
                                        if(that.gift_type == 'S'){
                                            that.gift_code = that.activityGiftDetail.gift_code;//卡号、兑奖码
                                            that.card_password = that.activityGiftDetail.card_password;//密码

                                            detailWrap.innerHTML = '<p class="gxGift" style="line-height:3rem;">'+ that.winning_describeMask+'</p><p class="gxGift" style="line-height:3rem;">卡号：'+that.gift_code+'</p><p class="gxGift" style="line-height:3rem;">密码：'+that.card_password+'</p>';
                                        }

                                        if(that.gift_type == 'I'){
                                            that.giftInsurance_Url = that.activityGiftDetail.giftInsurance_Url;//赠险链接
                                            axios.get(this.config + '/newActivityDrawController/queryGiftInsuranceType.do?userCode='+that.userCode).then(function(res) {
                                                that.safeStyleData = JSON.parse(res.data);
                                                console.log(JSON.parse(res.data))
                                                that.userType = that.safeStyleData.userType;
                                                if(that.userType == 'I'){
                                                    var giftInsurance_Url2 = that.giftInsurance_Url+'&src=WECHAT'
                                                    detailWrap.innerHTML = '<p class="gxGift" style="line-height:4.5rem;">'+ that.winning_describeMask+'</p><p class="gxGift" onclick="window.location.href = \''+giftInsurance_Url2+'\'" style="line-height:4.5rem;">点击此处获险</p>';
                                                }
                                                if(that.userType == 'O'){
                                                    var giftInsurance_Url2  = that.giftInsurance_Url+'&src=KA&agentcode='+that.userCode;
                                                    detailWrap.innerHTML = '<p class="gxGift" style="line-height:4.5rem;">'+ that.winning_describeMask+'</p><p class="gxGift" onclick="window.location.href = \''+giftInsurance_Url2+'\'" style="line-height:4.5rem;">点击此处获险</p>';
                                                }
                                            }, function(res){
                                                console.log(res)
                                            });

                                        }
                                    }, function(res){
                                        console.log(res)
                                    })
                                    var timer2 = setInterval(function(){
                                        that.getGiftMask = true;
                                        clearInterval(timer2);
                                    },500);
                                }
                                if(that.winningState == 0){//未中奖情况
                                    var timer3 = setInterval(function(){
                                        that.notGiftMask = true;
                                        clearInterval(timer3);
                                    },500);
                                }
                                clearInterval(timer);
                            }
                        },100);
                    }, function(res){
                        console.log(res)
                    })
                }
            },
            //中奖弹框
            getGiftClose(){
                document.getElementById("togoClick").removeAttribute("disabled");
                this.getGiftMask = false;
            },
            //再来一次
            againBtn(){
                this.notGiftMask = false;
                this.getGiftMask = false;
                document.getElementById("togoClick").removeAttribute("disabled");
            },
            //打开活动规则
            showRule(){
                document.getElementById("giftListWrap").innerHTML = '';
                var _this = this;
                // alert("点击出现规则弹框")
                axios.get(_this.config+'/newActivityDrawController/queryActivityUserGift.do?activityId='+_this.activityId+'&openid='+_this.openid).then(function(res){
                    _this.myGiftData = JSON.parse(res.data);//数组
                    console.log(JSON.parse(res.data),'抽奖规则')
                    if(_this.myGiftData!=null){
                        _this.myGiftList = _this.myGiftData;
                        var giftlistLen = _this.myGiftList.length;
                        var giftListWrap = document.getElementById("giftListWrap");
                        for(var n=0;n<giftlistLen;n++){
                            if(_this.myGiftList[n].gift_type == 'S'){//购物卡
                                var carTable = document.createElement('div');
                                carTable.innerHTML = '<table border="1" width="100%" class="creatTab" style="margin-top:2rem;">'
                                    +'<tr>'
                                    +'<th>描述</th>'
                                    +'<th>卡号</th>'
                                    +'<th>密码</th>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'<td>'+_this.myGiftList[n].winning_describe+'</td>'
                                    +'<td>'+_this.myGiftList[n].gift_code+'</td>'
                                    +'<td>'+_this.myGiftList[n].card_password+'</td>'
                                    +'</tr>'
                                    +'</table>'
                                giftListWrap.appendChild(carTable);
                            }
                            if(_this.myGiftList[n].gift_type == 'G'){//实物
                                var sthTable = document.createElement('div');
                                sthTable.innerHTML = '<table border="1" width="100%" class="safeTable" style="margin-top:2rem;">'
                                    +'<tr>'
                                    +'<th>描述</th>'
                                    +'<th>卡号</th>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'<td>'+_this.myGiftList[n].winning_describe+'</td>'
                                    +'<td>'+_this.myGiftList[n].gift_code+'</td>'
                                    +'</tr>'
                                    +'</table>'
                                giftListWrap.appendChild(sthTable);
                            }

                            if(_this.myGiftList[n].gift_type == 'I'){//增险
                                _this.$http.get('newActivityDrawController/queryGiftInsuranceType.do?userCode='+_this.userCode).then(function(res){
                                    _this.safeStyleData = res.data;
                                    _this.userType = _this.safeStyleData.userType;
                                    if(_this.userType == 'I'){
                                        _this.myGiftList[n].giftInsurance_Url = _this.myGiftList[n].giftInsurance_Url+'&src=WECHAT'
                                    }
                                    if(_this.userType == 'O'){
                                        _this.myGiftList[n].giftInsurance_Url = _this.myGiftList[n].giftInsurance_Url+'&src=KA&agentcode='+_this.userCode;
                                    }
                                }, function(res){
                                    console.log(res)
                                });
                                var safeTable = document.createElement('div');
                                safeTable.innerHTML = '<table border="1" width="100%" class="safeTable" style="margin-top:2rem;">'
                                    +'<tr>'
                                    +'<th>描述</th>'
                                    +'<th>链接</th>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'<td>'+_this.myGiftList[n].winning_describe+'</td>'
                                    +'<td><a onclick="window.location.href = \''+_this.myGiftList[n].giftInsurance_Url+'\'">点击此处获险</a></td>'
                                    +'</tr>'
                                    +'</table>'
                                giftListWrap.appendChild(safeTable);
                            }
                        }
                    }else{
                        console.log("小乌龟")
                    }
                }, function(res){
                    console.log(res)
                })
                _this.ruleMaskShow = true;
            },
            // 活动规则的活动说明
            activeSta(){
                alert("活动规则")
                this.activeUnd = true;
                this.giftUnd = false;
            },
            // 活动规则的活动奖品
            myGift(){
                alert("我的奖品")
                this.activeUnd = false;
                this.giftUnd = true;
            },
            //关闭活动规则
            closeRule(){
                // alert("关闭规则弹框")
                this.ruleMaskShow = false;
            },
            nqLink(){
                console.log("this.giftInsurance_Url:::"+this.giftInsurance_Url)
                window.location.href = this.giftInsurance_Url;
            },
            wqLink(){
                console.log("this.giftInsurance_Url:::"+this.giftInsurance_Url)
                window.location.href = this.giftInsurance_Url;
            },
            // 点击开始或暂停播放音乐
            changeOn(){
                let oAudio = document.querySelector("#audio");
                if(this.isOff){
                    oAudio.play();//让音频文件开始播放
                }else{
                    oAudio.pause();//让音频文件暂停播放
                }
                this.isOff = !this.isOff;
            },
            //音乐监听事件
            audioAutoPlay() {
                let audio = document.getElementById('audio');
                this.isOff = false;
                audio.play();
                document.removeEventListener('touchstart', this.audioAutoPlay);
            },
        },

        mounted(){
            //this.getOPenId();
            //this.firstJk();//页面初始化接口调用
            //this.isFirstOpen();//判断用户是否是第一次进入
            this.audioAutoPlay();//调用监听音乐播发事件
            //禁止分享
            /*document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 通过下面这个API隐藏右上角按钮
                WeixinJSBridge.call('hideOptionMenu');
            });*/
            // 自动播放音乐效果，解决微信自动播放问题
            document.addEventListener('touchstart',this.audioAutoPlay,false);
           document.addEventListener('WeixinJSBridgeReady', this.audioAutoPlay,false);
            let oAudio = document.querySelector("#audio");
            oAudio.onended = function () {//播放完毕，重新循环播放
                oAudio.load();
                oAudio.play();
            }
        },
        //模板
        computed: {

        }
    }

</script>
<style scoped>
    @media screen and (min-width:320px){html,body,button,input,select,textarea,p{font-size:14px;}}
    @media screen and (min-width:414px){html,body,button,input,select,textarea,p{font-size:16px;}}
    @media screen and (min-width:768px){html,body,button,input,select,textarea,p{font-size:20px;}}

    /*最外层div*/
    #wrap{
        width:100%;height:100%;background-size:cover; -moz-background-size: cover;
        z-index:0;max-width: 7.5rem;margin: 0 auto;position: relative;
    }
    /*头部logo*/
    .logoPic{ width: 100%; position: absolute;  z-index:0; }
    /*活动规则*/
    .rulePic{width: 1.28rem;height: 1.24rem;display: block;position: absolute;top: 0.1rem;right: 0.12rem;z-index: 1; }

    /*暂时没看出来是个啥*/
    /*.rulePic2{width: 100%;display: block;position: absolute;top: 0px;right: 0%;  }*/
    /*活动时间*/
    .theTime{font-size: 0.3rem;color: #F8E7E3;width: 100%;position: absolute;top: 3rem;left: 0;text-align: center;}
    /*抽奖模块*/
    .contWrap{
        /*width: 6.43rem;position: absolute;top: 4.42rem;left: 0.53rem;height: 6.10rem;*/
        width: 6.83rem;
        position: absolute;
        top: 4.42rem;
        left: 0.33rem;
        height: 7.10rem;
    }

    .redBg1Wrap{width: 100%;position: relative;height: 100%;}
    .redBg1{
        width: 100%;
        height: 100%;
        display: block
    }
    .redBg2Wrap{width: 90%;position: absolute;top: 5%;left: 5%;height: 90%;border-radius: 16px;padding: 0.15rem 0.1rem 0 0.1rem;}
    .overHide{ overflow: hidden;}
    .drawBtn{width: 33%;height: 32%;position: absolute;top: 33%;left: 33%;z-index: 2;border-radius: 16px;}
    .redBg2Wrap li,.redBg2Wrap a{width: 32%;float: left;height:1.98rem;background: url("../../static/images/nineGame1906/gif_bg.png") no-repeat;background-size:100% 100%; -moz-background-size: cover;text-align: center;border-radius: 6px;}
    .trans{
        /* background: #ffefef!important; */
        background: #FFA500!important;
    }
    /*抽奖按钮*/
    .redBg2Wrap button{
        margin: 0 1.5% 1% 0;
        /*background: url(../../static/images/nineGame1906/togo.png) no-repeat;  background-size: 100% 100%;*/
        position: absolute;top: 34%;left: 34%;width: 32%;height: 32%;border: none;outline: none;border-radius:6px;
    }
    /*奖项大小*/
    .giftPic{width: 0.52rem;margin-top: 15%;max-height:40%;}
    .giftNum{font-size: 0.28rem;  color: #990101;font-weight: bold;margin-top: 0.1rem;line-height: 2}
    /*剩余抽奖机会*/
    .stateWrap{position: absolute;bottom: 2vh;left: 0;width: 100%;text-align: center;}
    .stateP{font-size: 0.28rem; color: #fff;}

    /* 活动规则 */
    .ruleWrap{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0, 0, 0, 0.7);z-index: 2  }
    .ruleBox{width: 90%;margin-left: 5%;height: 100%;position: relative;}
    .ruleClose{width: 36px;position: absolute;right: 0;top:0.2rem;}
    .ruleUl{  overflow: hidden;  border-bottom: 1px solid #fff;}
    .ruleUl li{float: left;width: 50%;color: #fff;font-size:0.34rem;text-align: center;line-height:1.4rem  }
    .ruleCont{height: 90%;width: 100%;overflow: auto; }
    .liUnder{width: 50%;margin-left: 25%;display: block;}
    .someTit{background: #fff;padding: 6px 12px;font-size:0.34rem;color: #040404;float: left;margin-top:20px;margin-bottom:10px;font-weight: bold;}
    .someSta{font-size:0.3rem;color: #fff;margin-left: 0.2rem;line-height: 2}
    .names{color: #fabd02;}
    /* 我的奖品样式 */
    .creatTab,.safeTable{width: 100%;/* background: red; */border-color: #fff;color: #fff;}
    .creatTab th,.creatTab td{width:33%;font-size: 1rem;line-height: 2;word-break: break-all;text-align: center;}
    .safeTable th,.safeTable td{width:50%;font-size: 1rem;line-height: 2;word-break: break-all;text-align: center;}
    /* 我的奖品样式结束 */

    /* 中奖弹框 */
    .getGift{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background:url(../../static/images/nineGame1906/zjBg.png) no-repeat;
        background-size:cover; -moz-background-size: cover;z-index: 2;}
    .ruleClosezj{position: absolute;top: 20px;right: 20px;width: 36px;}
    .getCont{top: 23%;left: 0;padding: 1.11rem 1.25rem 0.2rem 1.25rem;}
    .getTk{display: block;width: 3.04rem;height: 2.58rem;top:6rem;position: absolute;left: 32%;}
    .zjbjWrap{background: url(../../static/images/nineGame1906/zjbj.png) no-repeat; -moz-background-size: cover;background-size: cover;width:100%;height:7.5rem;}
    .lpj{text-align: center;position: absolute;top: 3.3rem;}
    .inner{display: table-cell;vertical-align: middle;text-align: center;width: 5rem;}
    .inner2{margin-top: 0.2rem !important;}
    .inner p{line-height: 1.8;font-size: 0.3rem;color: #fff;margin: 0 auto;}
    .zjdeta{float: right;width: 76%;height: 9rem;position: relative;}
    .dsy{width: 28%;position: absolute;top: 6px;right: 6%}
    .detailWrap{width: 80%;text-align: center;}
    .moneys{color: #fff;font-size: 1.4rem;line-height: 1.4; }
    .moneys span{font-size: 3rem;}
    .gxGift{font-size: 1rem;color: #fff;}
    .scWrap{background: #ea3700;border-radius: 6px;padding: 0.1rem 2.2rem;text-align: center;display: inline-block;font-size: 0.8rem;margin-top: 10px;color: #fff}
    /* 未中奖弹框 */
    .wzjTk{width: 100%;height: 100%;position: fixed;top: 0;left: 0;background:rgba(0,0,0,0.7);text-align: center;z-index: 2;}
    .kxP{font-size:0.44rem;line-height: 2;color: #fff;margin-top: 1.44rem;}
    .againP{font-size:0.36rem;line-height: 2;color: #fff;margin-bottom: 0.5rem;}
    .mzjKid{display: block;max-width: 100%;height: 4.77rem;width: 4.33rem;margin: 0rem auto 0.5rem}
    .wzjBtn{width: 3.7rem;margin-left: 25%;background: url(../../static/images/nineGame1906/btnBg.png) no-repeat;background-size: 100% 100%;height: 1rem;font-size: 0.34rem;line-height: 1rem;text-align: center;color: #fff;}
    .marBot{margin-bottom: 1rem;}
    .zjBot{top: 9rem;position: absolute;right: 25%;}
    /* 未中奖弹框结束 */

    /*音乐播放*/
    .isOn{width:0.83rem;height:0.83rem;position: fixed;z-index: 2;left: 0.1rem;top:0.1rem;-webkit-animation: rotating 1.2s linear infinite;animation: rotating 1.2s linear infinite;background: url("../../static/images/nineGame1906/isOn.png") 0 0 no-repeat;background-size:100%;}
    @keyframes rotating {
        from { -webkit-transform: rotate(0) }
        to { -webkit-transform: rotate(360deg) }
    }
    @-webkit-keyframes rotating {
        from { -webkit-transform: rotate(0) }
        to { -webkit-transform: rotate(360deg) }
    }
    .isOff{width:0.83rem;height:0.83rem;position: fixed;z-index: 2;left: 0.1rem;top:0.1rem;background: url("../../static/images/nineGame1906/isOff.png") 0 0 no-repeat;background-size:100%;}
    /*音乐播放结束*/
    /*客户信息录入框*/
    .mesMask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background:rgba(0,0,0,0.7);
        z-index: 2;
    }
    .mesInp{
        width: 89%;
        height: 8rem;
        position: absolute;
        left: 6%;
        margin-top: 4rem;
        background: #f01d1f;
        border-radius: 16px;
        padding: 3%;
    }
    .mesN{
        position: relative;
        background: #ffefef;
        border-radius: 16px;
        height: 86%;
    }
    .inpGift[data-v-52e825fc] {
        width: 36%;
        position: absolute;
        top: 0%;
        left: 32%;
    }
    .inpList {
        width: 88%;
        height: 74%;
        /* background: red; */
        position: absolute;
        left: 6%;
        margin-top: 18%;
    }
    .inpList li{
        overflow: hidden;
        border-bottom: 0.5px solid #999;
        height: 1.2rem;
    }
    .circelR{
        height: 0.2rem;
        width: 0.2rem;
        background: #ff3129;
        border-radius: 50%;
        float: left;
        margin-top: 0.47rem;
    }
    .labels{
        font-size: 0.3rem;
        color: #333;
        line-height: 1.2rem;
        float: left;
        margin-left: 3%;
        width: 20%;
    }
    .inps{
        width: 66%;
        height: 1.17rem;
        float: left;
        border: none;
        outline: none;
        background: #ffefef;
        /* line-height: 2rem; */
        font-size: 0.3rem;
    }
    .inps2{
        font-size: 0.3rem;
        width: 50%;
        height: 1.16rem;
        float: left;
        border: none;
        outline: none;
        background: #ffefef;
    }
    .yzBtn{
        background: url(../../static/images/nineGame1906/yzBtn.png) no-repeat;
        background-size: 100% 100%;
        width: 19%;
        height: 0.6rem;
        line-height: 0.2rem;
        text-align: center;
        color: #6f2221;
        font-size: 0.32rem;
        float: right;
        margin-top: 0.3rem;
        font-weight: bold;
        border-radius: 4px;
        z-index: 99;
        position: absolute;
    }
    .codeImg{
        width: 23%;
        height: 1.0rem;
        text-align: center;
        color: #6f2221;
        font-size: 1rem;
        float: right;
        font-weight: bold;
        border-radius: 4px;
    }
    .codeImg img { height:1.2rem;width: 100%}
    .codeImg p { font-size:.8rem; white-space:nowrap; margin-top:-1rem;}
    .btnWraps{
        overflow: hidden;
        position: absolute;
        width: 86%;
        left: 7%;
        border-bottom: none !important;
        margin-top: 0.9rem;
    }
    .chodeBtn{
        background: url(../../static/images/nineGame1906/chodeBtnbg.png) no-repeat;
        width: 43%;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #6f2221;
        font-size: 0.38rem;
        font-weight: bolder;
        border-radius: 6px;
        z-index: 2;
        border: 1px solid;
    }
    .floatL{
        float: left;
    }
    .floatR{
        float: right;
    }

    .yzBtn { border:none}
    .yzBtn[disabled] { filter:grayscale(100%)}
    /*客户信息录入框结束*/

</style>
