// jQueryの練習 （$マークはjQueryを使っている）

// img要素を取得する
let img = document.getElementById("my_img");
// img要素を取得する
let my_text ;

const imgs = ["じゃんけん_グー.png", "じゃんけん_チョキ.png", "じゃんけん_パー.png"];  // 画像ファイル名
const texts = ["グー", "チョキ", "パー"];  // テキスト名
let index ;  // インデックス番号
let index2 ;  // インデックス番号
// functionの仕様 idは「#」、classは「.」、pやh1などは「無し」    


// 多重配列の宣言と０の代入
const performance = new Array(5);
for (let i = 0; i < 5; i++) {performance[i] = new Array(5)
  performance[i] = [0,0,0,0,0];
};

// 過去データ（戦績）がある場合は反映
if (parseInt(localStorage.getItem("0_0"), 10)>0) {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // ローカルストレージは文字列で保存されるため、10進数の整数に変換して戻す
      performance[i][j] = parseInt(localStorage.getItem(i+"_"+j), 10);
      // console.log(performance[i][j],"検証"); 
    }
    console.log(performance[i],"検証"); 
  }
  gameresult(); //戦績の反映
};


index = 4  ;  //選択無しの時のエラー表示


// 始めにモーダルウィンドウを表示
window.onload = function(){
  container.addClass('active').dequeue();
  stopbutton = "off";
};



////////////////// 自分のじゃんけん入力 //////////////////////
////// クリック入力 /////////
// gu の クリックを監視（on） 
$("#gu").on("click", function () {
  index = 0
  $("#my").attr("src", "img/" + imgs[index]);
  $("#my_text").html("グー");
  battle();
});
// cho の クリックを監視（on） 
$("#cho").on("click", function () {
  index = 1
  $("#my").attr("src", "img/" + imgs[index]);
  $("#my_text").html("チョキ");
  battle();
});
// pa の クリックを監視（on） 
$("#pa").on("click", function () {
  index = 2
  $("#my").attr("src", "img/" + imgs[index]);
  $("#my_text").html("パー");
  battle();
});

// ////// キー入力 /////////
$("body").keydown(function(event) {
  if (stopbutton == "off") {
  }else{
    if (event.key === "ArrowLeft" || event.key === "a" ){
      // console.log("←キーが押されました");
      index = 0
      $("#my").attr("src", "img/" + imgs[index]);
      $("#my_text").html("グー");
      battle();
    }
    if (event.key === "ArrowDown" || event.key === "s"){
      // console.log("↓キーが押されました");
      index = 1
      $("#my").attr("src", "img/" + imgs[index]);
      $("#my_text").html("チョキ");  
      battle();
    }
    if (event.key === "ArrowRight" || event.key === "d"){
      // console.log("→キーが押されました");
      index = 2
      $("#my").attr("src", "img/" + imgs[index]);
      $("#my_text").html("パー");  
      battle();
    }
  }
});


// 変数に要素を入れる
var close = $('.modal-close'),
  container = $('.modal-container');

var result = $('.result-container');

// モーダルウィンドウ
$(function(){
  
  //勝負・再戦ボタンをクリックしたらモーダルを閉じる
  close.on('click',function(){  
    container.removeClass('active');
    stopbutton = "on";

    // $("#heart1").addClass("color", "#EF4444").dequeue();         //妥協
    // $("#heart2").addClass("color", "#EF4444").dequeue();         //妥協
    // $("#heart3").addClass("color", "#EF4444").dequeue();         //妥協
    $(heart[0]).css("color", "#EF4444");
    $(heart[1]).css("color", "#EF4444");
    $(heart[2]).css("color", "#EF4444");
    HP = 3 ;


    $("#cp").removeAttr("src");
    $("#cp_text").html("");
    $("#my").removeAttr("src");
    $("#my_text").html("");
    $(".modal-close").html("再戦");
    alterLife( 100 ); ; //HPを満タンに
    $("#result") .html("判定");


    index = 4  ;  //選択無しの時のエラー表示

    // 勝負開始
    index2 = Math.floor(Math.random()*3);
    $("#cp").attr("src", "img/" + imgs[index2]);
    $("#cp_text").html(texts[index2]);


    // 毎秒実行される関数
    pitch = 0;
    count = 0;
    var countUp = function() {
      count++;
      // console.log(count);
      lifetime(count);
    }
    pitch = setInterval(countUp, 100);
  
    });
  return false;
});

// 音源の設定
const suka = new Audio("music/suka.mp3");
const attack = new Audio("music/attack.mp3");
const suffer = new Audio("music/suffer.mp3");
const win = new Audio("music/win.mp3");
const lose = new Audio("music/lose.mp3");

// 自分のハートの設定
let HP = 3 ;
let heart = ["#heart1","#heart2","#heart3"];


// 勝負の判定
function battle() {
  performancecount();
  
  
  if(index != 4) {
      // 勝敗判定
    if (index===index2) {
        $("#result") .html("△");
        suka.currentTime = 0;     //先に音源読み込み
        suka.play();              //遅延せずに再生
      }else if ((index===0&&index2===1)||(index===1&&index2===2)||(index===2&&index2===0)) {
        $("#result") .html("〇");
        alterLife( -10 );
        attack.currentTime = 0;     //先に音源読み込み
        attack.play();               //遅延せずに再生
      }else if ((index===1&&index2===0)||(index===2&&index2===1)||(index===0&&index2===2)) {
        $("#result") .html("✕");
        // 自分のダメージで点滅
        $("#my").fadeOut(50,function(){$(this).fadeIn(50)});
        // ライフ減少
        HP = HP -1 ;
        $(heart[HP]).css("color", "#404040");
        // console.log(HP);
        // ダメージ音
        suffer.currentTime = 0;     //先に音源読み込み
        suffer.play();              //遅延せずに再生

          if ( HP === 0 ) {
            loseresult()
            performance[0][2] = performance[0][2] +1 ; //敗北数
          }

      }else{
          $("#result") .html("error");
    }
    
    // 点滅
    $("#cp").fadeOut(50,function(){$(this).fadeIn(50)});

    // 次の手を表示
    setTimeout(function(){
    index2 = Math.floor(Math.random()*3);
    $("#cp").attr("src", "img/" + imgs[index2]);
    $("#cp_text").html(texts[index2]);
    },200);
  
  }
};


// HPバー
const lifeBar = document.getElementById('life-bar')         // ライフバー
const lifeMark = document.getElementById('life-mark')       // ライフの光部分
const increaseBtn = document.getElementById('increase-btn') // + ボタン
const decreaseBtn = document.getElementById('decrease-btn') // - ボタン
let life = 100                                              // ライフ初期値
lifeBar.style.width = "100%"                                // ライフ初期幅

// *** ライフ変更処理 ***
function alterLife( value ){
    // lifeの値を算出する
    life += value 
    if ( life <= 0 ){
        // 算出の結果 0 以下になった場合
        life = 0
        // 0.3秒後に光部分を非表示にする
        setTimeout(function(){
            lifeMark.style.visibility = 'hidden'
        }, 300)
    } else {
        // 算出の結果 100 を超過した場合
        if ( life > 100 ) {
            life = 100
        }
        // 光部分を表示する
        lifeMark.style.visibility = 'visible'
    }
    // スタイル(幅)を更新する
    lifeBar.style.width = life + "%"

  // HPが0
  if(life === 0) {

    // 勝利判定
    $(".comment") .html("あなたの勝ち");
    container.addClass('active').dequeue(); 
    stopbutton = "off";

    // カウントを止める
    clearInterval(pitch);
    
    // 0.3秒後に光部分を非表示にする  
    setTimeout(function(){
      timeMark.style.visibility = 'hidden'
      time = Maxtime ;
      timeBar.style.width = "100%" ;
      
      // 勝利の音
      win.currentTime = 0;     //先に音源読み込み
      win.play();              //遅延せずに再生

      performance[0][1] = performance[0][1] +1 ; //勝利数
      performancecount3();
      gameresult();
  
    }, 300);

    setTimeout(function(){
      lifetime();
    }, 600);

  }

}


// 残り戦闘時間
const timeBar = document.getElementById('time-bar')         // ライフバー
const timeMark = document.getElementById('time-mark')       // ライフの光部分
let Maxtime = 100                                              // ライフ初期値
let time = 100                                              // ライフ初期値
timeBar.style.width = "100%"                                // ライフ初期幅

// *** 残り戦闘時間処理 ***
function lifetime( count ){
    // timeの値を算出する
    time = Maxtime - count
    // console.log(time) 
    if ( time <= 0 ){
        // 算出の結果 0 以下になった場合
        time = 0; //0以下の秒を0にする

        // 負け判定
        $(".comment") .html("あなたの負け");
        container.addClass('active').dequeue();
        stopbutton = "off";

        performance[0][2] = performance[0][2] +1 ; //敗北数
        performancecount3();
        gameresult();
        
        // カウントを止める
        clearInterval(pitch);
        
        // 0.3秒後に光部分を非表示にする
        setTimeout(function(){
            timeMark.style.visibility = 'hidden'
            time = Maxtime ;
            timeBar.style.width = "100%" ;

            // 負けの音
            lose.currentTime = 0;     //先に音源読み込み
            lose.play();              //遅延せずに再生

        }, 300)

        setTimeout(function(){
          lifetime();
          }, 600);

    
    } else {
        // 算出の結果 100 を超過した場合
        if ( time > 100 ) {
            time = 100
        }
        // 光部分を表示する
        timeMark.style.visibility = 'visible'
    }
    // スタイル(幅)を更新する
    timeBar.style.width = time + "%"
}

// 負け判定
function loseresult(){
          // 負け判定
          $(".comment") .html("あなたの負け");
          container.addClass('active').dequeue();
          stopbutton = "off";
          

          performance[0][2] = performance[0][2] +1 ; //敗北数
          performancecount3()
          gameresult()

          // カウントを止める
          clearInterval(pitch);
          
          // 0.3秒後に光部分を非表示にする
          setTimeout(function(){
              timeMark.style.visibility = 'hidden'
              time = Maxtime ;
              timeBar.style.width = "100%" ;
  
              // 負けの音
              lose.currentTime = 0;     //先に音源読み込み
              lose.play();              //遅延せずに再生
  
          }, 300)
  
          setTimeout(function(){
            lifetime();
            }, 600);
  
};




// ローカルストレージ//////////////////////////////////////////////////////////

  // ローカルストレージにセット（登録）する

      // localStorage.setItem(key, keystorage);
      // const html = `
      //   <li>
      //     <p>${key}</p>
      //     <p>${keystorage}</p>
      //   </li>
      //   `; //「js 文字 連結」でググると確認できるかも？
      // $("#list").append(html);

// 戦績の一部をカウント
function performancecount(){
  performance[1][0]=performance[1][0] +1 ;
  // console.log(performance[1][0],"勝負の数");

  performance[index +2][0]=performance[index +2][0]+1;
  
  if (index===index2) {
    // $("#result") .html("△");
    // performance[index +2][3]++ ;
    performance[1][3]=performance[1][3]+1 ;
    performance[index +2][3]=performance[index +2][3]+1 ;

  }else if ((index===0&&index2===1)||(index===1&&index2===2)||(index===2&&index2===0)) {
    // $("#result") .html("〇");
    // performance[index +2][1]++ ;
    performance[1][1]=performance[1][1]+1 ;
    performance[index +2][1]=performance[index +2][1]+1 ;

  }else if ((index===1&&index2===0)||(index===2&&index2===1)||(index===0&&index2===2)) {
    // $("#result") .html("✕");
    // performance[index +2][2]++ ;
    performance[1][2]=performance[1][2]+1 ;
    performance[index +2][2]=performance[index +2][2]+1 ;

  };
};


// 戦績の保存（ローカルストレージに保存）  /////////////////////////////
function performancecount3(){
  if (stopbutton == "off") { //モーダルウィンドウ表示の有無で実行
    performance[0][0]=performance[0][0]+1 ;

    console.log(performance[0],"試合の数"); //試合数　勝ち　負け
    console.log(performance[1],"勝負の数"); //勝負数　勝ち　負け　引き分け
    console.log(performance[2],"グーの戦績"); //グー  　勝ち　負け　引き分け
    console.log(performance[3],"チョキの戦績"); //チョキ　勝ち　負け　引き分け
    console.log(performance[4],"パーの戦績"); //パー  　勝ち　負け　引き分け


    // ローカルストレージに保存
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        localStorage.setItem( i+"_"+j , performance[i][j]);
        // console.log(performance[i][j],"検証"); 
        // console.log(i+"_"+j,"検証"); 
      }
    }
    
  }
};

//.clear クリックイベント  戦績のクリア ///////////////////////////////
$(".clear").on("click",function(){
  localStorage.clear();
  for (let i = 0; i < 5; i++) {performance[i] = new Array(5)
    performance[i] = [0,0,0,0,0];
  };

  $("#game0").html(performance[0][0] +"回");
  $("#game1").html(performance[0][1] +"回");
  $("#game2").html(performance[0][2] +"回");

  $("#vs0").html(performance[1][0] +"回");
  $("#vs1").html(performance[1][1] +"回");
  $("#vs2").html(performance[1][2] +"回");
  $("#vs3").html(performance[1][3] +"回");

  $("#gu0").html(performance[2][0] +"回");
  $("#cho0").html(performance[3][0] +"回");
  $("#pa0").html(performance[4][0] +"回");

  $("#game1p").empty();
  $("#game2p").empty();

  $("#vs1p").empty();
  $("#vs2p").empty();
  $("#vs3p").empty();

  $("#gu1p").empty();
  $("#gu2p").empty();
  $("#gu3p").empty();
  $("#cho1p").empty();
  $("#cho2p").empty();
  $("#cho3p").empty();
  $("#pa1p").empty();
  $("#pa2p").empty();
  $("#pa3p").empty();

});



// 戦績の反映 ////////////////////////////////////////////////////
function gameresult(){

  $("#game0").html(performance[0][0] +"回");
  $("#game1").html(performance[0][1] +"回");
  $("#game2").html(performance[0][2] +"回");

  $("#game1p").html(Math.round(performance[0][1]/performance[0][0]*100) +"%");
  $("#game2p").html(Math.round(performance[0][2]/performance[0][0]*100) +"%");

  $("#vs0").html(performance[1][0] +"回");
  $("#vs1").html(performance[1][1] +"回");
  $("#vs2").html(performance[1][2] +"回");
  $("#vs3").html(performance[1][3] +"回");

  $("#vs1p").html(Math.round(performance[1][1]/performance[1][0]*100) +"%");
  $("#vs2p").html(Math.round(performance[1][2]/performance[1][0]*100) +"%");
  $("#vs3p").html(Math.round(performance[1][3]/performance[1][0]*100) +"%");

  $("#gu0").html(performance[2][0] +"回");
  $("#gu1p").html(Math.round(performance[2][1]/performance[2][0]*100) +"%");
  $("#gu2p").html(Math.round(performance[2][2]/performance[2][0]*100) +"%");
  $("#gu3p").html(Math.round(performance[2][3]/performance[2][0]*100) +"%");

  $("#cho0").html(performance[3][0] +"回");
  $("#cho1p").html(Math.round(performance[3][1]/performance[3][0]*100) +"%");
  $("#cho2p").html(Math.round(performance[3][2]/performance[3][0]*100) +"%");
  $("#cho3p").html(Math.round(performance[3][3]/performance[3][0]*100) +"%");

  $("#pa0").html(performance[4][0] +"回");
  $("#pa1p").html(Math.round(performance[4][1]/performance[4][0]*100) +"%");
  $("#pa2p").html(Math.round(performance[4][2]/performance[4][0]*100) +"%");
  $("#pa3p").html(Math.round(performance[4][3]/performance[4][0]*100) +"%");

};

