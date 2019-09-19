<template>
    <div class="bg">
        <div @click="changeOn" :class="isOff?'isOff':'isOn'"></div>
        <audio ref="audio" autoplay="autoplay" loop :src="musicSrc" muted></audio>
        <div class="activeRules">活动规则</div>
        <div class="turnTitle"></div>
        <!--转盘区域-->
       <div class="wheel-main">
           <!--指针区域-->
           <div class="wheel-pointer-box">
            <div class="wheel-pointer" @click="rotate_handle()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
          </div>
          <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">                   
                    <div class="prize-list">
                        <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                            <div class="prize-pic">
                                <img :src="item.icon">
                            </div>
                            <div class="prize-type">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
            </div><!--转盘合子-->
       </div><!--转盘区域-->
       <div class="footer">
            <div class="content">
                <p>已有3358人参与</p>
                <p class="lottery_ticket">您今天还有{{ lottery_ticket}}次抽奖机会 </p>
            </div>
        </div><!--footer end-->
        <!--是否中奖弹框-->
        <div class="toast" v-show="toast_control">
            <div class="toastCon">
                <div class="toastWin" v-show="hasPrize===1">
                    <div class="wincontxt">
                        <p>“恭喜您抽中 <span>{{price_con}}</span>， 请登录京东商城凭借密码兑换”</p>
                        <p>卡号：1234567890112222</p>
                        <p>密码：11222qujb</p>
                        <div class="winGif"></div>
                    </div>
                </div>
                <div class="toastSorry" v-show="hasPrize===0">
                        <div class="sorryTitle">
                            <p>可惜！差点就中奖了</p>
                             <p>再试一次吧～</p>
                        </div>
                        <div class="win_no"></div>
                </div>
                <div class="BtnWarp" v-if="lottery_ticket>0" @click="again()"><span :class="lottery_ticket===0?'countFull':''">{{lottery_ticket==0?'次数已用完':'再来一次'}}</span></div>
                <div class="BtnWarp" v-else><span class="countFull">次数已用完</span></div>
            </div>
        </div>
        <!--是否中奖弹框end--> 
    </div>
</template>


<script>
import "@/assets/css/turnplate.css";
import prizeList from "@/assets/js/dataBase.js";
import musicSrc from "../../static/map3/danche.mp3";
export default {
  data() {
    return {
      musicSrc: musicSrc,
      isOff: true, //音乐关闭
      prize_list: prizeList, //奖品列表
      toast_control: false, //抽奖结果弹出框控制器
      hasPrize: false, //是否中奖
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: 0, //将要旋转的角度
      start_rotating_degree_pointer: 0, //指针初始旋转角度
      rotate_angle_pointer: 0, //指针将要旋转的度数
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
      click_flag: true, //是否可以旋转抽奖
      currentindex: 0, //测试用，用来接收后台返回中奖的那个区域的index
      lottery_ticket: 3, //抽奖次数
      price_con: "10元京东卡"
    };
  },
  mounted() {
    this.audioAutoPlay(); //调用监听音乐播放事件;
    // 自动播放音乐效果，解决微信自动播放问题
    document.addEventListener("touchstart", this.audioAutoPlay, false);
    document.addEventListener("WeixinJSBridgeReady", this.audioAutoPlay, false);
    let oAudio = this.$refs.audio;
    oAudio.onended = function() {
      //播放完毕，重新循环播放
      oAudio.load();
      oAudio.play();
    };
  },
  methods: {
    // 点击开始或暂停播放音乐
    changeOn() {
      let oAudio = this.$refs.audio;
      if (this.isOff) {
        oAudio.play(); //让音频文件开始播放
      } else {
        oAudio.pause(); //让音频文件暂停播放
      }
      this.isOff = !this.isOff;
    },
    //音乐监听事件
    audioAutoPlay() {
      let audio = this.$refs.audio;
      this.isOff = false;
      audio.play();
      document.removeEventListener("touchstart", this.audioAutoPlay);
    },
    // 点击指针选择奖品规则
    rotate_handle() {
      this.currentindex = 5; //指定每次旋转到的奖品下标 指向一等奖的位置
      this.rotating();
    },
    rotating() {
      if (!this.click_flag) return;
      this.lottery_ticket -= 1; //转盘次数每次递减
      if (this.lottery_ticket < 0) {
        this.lottery_ticket = 0;
      } else {
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        // var random = Math.floor(Math.random() * 7);
        var result_index = this.currentindex; // 最终要旋转到哪一块，对应prize_list的下标 对接接口后这块就是返回的那个中奖的位置
        var result_angle = [40,320,275,208,165,90]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =this.start_rotating_degree +rand_circle * 360 +result_angle[result_index]-this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          console.log(this.rotate_angle,'this.rotate_angle');
          var that = this;
          //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          // 旋转结束后，允许再次触发
          setTimeout(function() {
            that.click_flag = true;
            that.game_over();
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          //
        }
      }
    },


    // // 随机出现内容
    // rnd(n, m) {
    //   var random = Math.floor(Math.random() * (m - n + 1) + n);
    //   return random;
    // },
    //转盘结束
    game_over() {
      this.toast_control = true;
      this.hasPrize = this.prize_list[this.currentindex].isPrize;
      this.price_con = this.prize_list[this.currentindex].name;
      console.log(this.hasPrize, "has");
    },
    //再来一次
    again() {
      this.toast_control = false;
      this.hasPrize = this.prize_list[this.currentindex].isPrize;
      this.price_con = this.prize_list[this.currentindex].name;
      this.rotating();
    }
  }
};
</script>