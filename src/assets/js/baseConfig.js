/** 原始金蛋图片导入 */
import egg1 from '@/assets/images/activeEgg/egg1.png'
import egg2 from '@/assets/images/activeEgg/egg2.png'
import egg3 from '@/assets/images/activeEgg/egg3.png'
/** 砸开没有礼物金蛋图片导入**/
import sorry1 from '@/assets/images/activeEgg/sorry1.gif'
import sorry2 from '@/assets/images/activeEgg/sorry2.gif'
import sorry3 from '@/assets/images/activeEgg/sorry3.gif'

/** 砸开有礼物的金蛋图片导入**/
import win1 from '@/assets/images/activeEgg/win1.gif'
import win2 from '@/assets/images/activeEgg/win2.gif'
import win3 from '@/assets/images/activeEgg/win3.gif'
// 原始金蛋数组
let goldenEggImg = [
  {id: 0, src: egg1},
  {id: 1, src: egg2},
  {id: 2, src: egg3}
]
// 没有礼物金蛋数组
let sorryEggs = [
  {id: 0, src: sorry1},
  {id: 1, src: sorry2},
  {id: 2, src: sorry3}
]
// 有礼物
let winEggs = [
  {id: 0, src: win1},
  {id: 1, src: win2},
  {id: 2, src: win3}
]
export {goldenEggImg, sorryEggs, winEggs}
