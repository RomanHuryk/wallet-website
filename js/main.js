// Placeholder 
var placeholderFunction = function() {
  $('input, textarea').placeholder({ customClass: 'my-placeholder' });
}

// Placeholder 
var contentWayPoint = function() {
  var i = 0;
  $('.animate-box').waypoint(function(direction) {
    if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {
      i++;
      $(this.element).addClass('item-animate');
      setTimeout(function() {
        $('body .animate-box.item-animate').each(function(k) {
          var el = $(this);
          setTimeout(function() {
            var effect = el.data('animate-effect');
            if (effect === 'fadeIn') {
              el.addClass('fadeIn animated-fast');
            } else if (effect === 'fadeInLeft') {
              el.addClass('fadeInLeft animated-fast');
            } else if (effect === 'fadeInRight') {
              el.addClass('fadeInRight animated-fast');
            } else {
              el.addClass('fadeInUp animated-fast');
            }
            el.removeClass('item-animate');
          }, k * 200, 'easeInOutExpo');
        });

      }, 100);
    }
  }, { offset: '85%' });
};
//index开始
// $("#channel-btn").click(function() {
//   $.ajax({
//     url: "http://47.254.39.10:20552",
//     type: "POST",
//     data: JSON.stringify({
//       "jsonrpc": "2.0",
//       "method": "getchannelstate",
//       "params": [$("#wallet_add").html()],
//       "id": 1
//     }),
//     contentType: 'application/json',
//     success: function(message) {
//       $('#channels').html('');
//       if (message.result) {
//         message.result.forEach((item) => {
//           // if (item.tx_info && item.channel_state === 'State.OPEN') {
//           if (item.tx_info) {
//             $(`<div class='channel-box'><p>${item.tx_info[1].address}</p><h5>Deposit:${item.tx_info[0].deposit}</h5><h5>Balance: ${item.tx_info[0].balance}</h5><h5>${item.channel_state}</h5></div>`)
//               .appendTo('#channels').click(() => {
//                 transFace('.channel-info-form');
//                 // b = $(obj).attr("id").split("-")[1]; //获取点击了第几个div   
//                 $("#info-channel-name").text(item.channel_name);
//                 $("#info-sender-addr").text(item.tx_info[0].address);
//                 $("#info-receiver-addr").text(item.tx_info[1].address);
//                 $("#info-time").text(item.open_block);
//                 $("#info-sender-deposit").text(item.tx_info[0].deposit);
//                 $("#info-sender-balance").text(item.tx_info[0].balance);
//                 $("#info-state").text(item.channel_state);
//               });
//           }
//         });
//       }
//     },
//     error: function(message) {
//       alert("error");
//     }
//   });
// });
$("#setting-reset").click(function() {
  $(".setting-input").val("https://test.trinity.tech");
})
 $("#txonchain").click(function() {
   transFace('.txonchain-form');
   $("#txonchain-address").val("");
   $("#txonchain-amount").val("");
 });
// $(".setting-save-btn").click(function() {
//   $(".setting-form").hide();
//   alert("Save success!");
// })
//index结束
//channel-edit开始
$("#channel-regist").click(function() {
   transFace('.channel-form');
   $("#regist-channel-address").val("");
   $("#regist-channel-deposit").val("");
   $("#regist-channel-time").val(""); 
 });
//channel-edit结束

//channel开始
$("#regist-channel-assets").focus(function() {
  transFace('.assets-form');
});
$(".btn-channel").click(function() {
  if (!$("#regist-channel-address").val()) {
    alert("Address can't be empty.");
    return;
  }
  if (!$("#regist-channel-deposit").val()) {
    alert("Deposit can't be empty.");
    return;
  }
  if (!$("#regist-channel-time").val()) {
    alert("Time Password can't be empty.");
    return;
  }
  transFace('.channel-pay-form');
  $("#channel-comfirm-info").html("You will add a new channel. <br />Receiver address : " + $("#regist-channel-address").val() + "<br>Deposit : " + $("#regist-channel-deposit").val() + $("#regist-channel-assets").val());
});
$('#frm_confirm_password').submit(() => {  
  if ($("#channel-comfirm-password").val() == "123456") {
    $.ajax({
      url: "http://47.254.39.10:20552",
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "registchannle",
        "params": [$("#wallet_add").html(), $("#regist-channel-address").val(), $("#regist-channel-assets").val(), $("#regist-channel-deposit").val(), $("#regist-channel-time").val()],
        "id": 1
      }),
      // crossDomain: true,
      contentType: 'application/json',
      success: function(message) {
        if (message.result.error) {
          alert(message.result.error);
        } else if (message.error) {
          alert(message.error.message);
        } else {
          alert("Regist success!");
          // $("#Channel-3").show();
          // $("#channel-remark-3").text($("#regist-channel-remark").val() || $("#regist-channel-remark").val());
          // $("#channel-address-3").text(message.result.channel_name);
          // $("#channel-time-3").text($("#regist-channel-time").val() + "Block");
          // $("#channel-deposit-3").text("Deposit:" + $("#regist-channel-deposit").val() + $("#regist-channel-assets").val());
          // $("#channel-state-3").text("State:OPEN");
          // $('#frm_confirm_password').hide();
          // $("#channel-pay-close-btn").trigger('click');
          // $(".channel-form").hide();
          // $(".channel-edit-form").show();
          $.ajax({
            url: "http://47.254.39.10:20552",
            type: "POST",
            data: JSON.stringify({
              "jsonrpc": "2.0",
              "method": "sendrawtransaction",
              "params": [$("#wallet_add").html(), message.result.channel_name, message.result.trad_info],
              "id": 1
            }),
            contentType: 'application/json',
            success: function(message) {
              if(message.result == "SUCCESS"){
              transFace('.channel-edit-form', true);
              $("#channel-btn").trigger('click');//refresh channel list
              }else{
                alert("something error");
              }
            },
            error: function(message) {
              alert("error");
            }
          });
        }
      },
      error: function(message) {
        alert("error");
      }
    });
  } else {
    alert("The password is incorrect.");
  }
  return false;
});

// $("#channel-comfirm-password").change(function() {
  
// });
//channel结束
//channel-info开始
$("#btn_closechannel").click(function() {
  if ($("#info-state").text() == "OPEN") {
    var se=confirm("Comfirm close channle?");
      if (se==true){
        $.ajax({
          url: "http://47.254.39.10:20552",
          type: "POST",
          data: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "closechannel",
            "params": [$("#wallet_add").html(), $("#info-receiver-addr").text(), $("#info-channel-name").text()],
            "id": 1
          }),
          contentType: 'application/json',
          success: function(message) {
            if (message.result) {
              alert("Channle is in SETTLING state.");
              $(".channel-info-form").hide();
            }
          },
          error: function(message) {
            alert("error");
          }
        });
      }else{
        return false;
      }
  } else {
    alert('Channel not in OPEN state.');
  }
})
$(".btn-totransfer").click(function() {
  if ($("#info-state").text() == "OPEN") {
  transFace('.transfer-form');
  $("#transfer-channel-name").val($("#info-channel-name").text());
  $("#transfer-address").val($("#info-receiver-addr").text());
  $("#transfer-amount").val("");
  $("#total-amount").text($("#info-sender-balance").text());
  } else {
    alert('Channel not in OPEN state.');
  }
});
//channel-info结束
//add开始
$("#add-deposit").click(function(){
  if ($("#info-state").text() == "OPEN") {
    transFace('.add-form');
    $(".add-input").val("");
  }else{
    alert('Channel not in OPEN state.');
  }
});
$(".add-deposit-btn").click(function() {
  if ($(".add-input").val()) {
      if ($(".add-input").val() > Number($("#total-amount2").text())) {
        alert("Deposit amount should be less than the balance on chain.");
        return;
      } else {
      transFace('.deposit-pay-form');
      $("#deposit-comfirm-info").text("Add " + $(".add-input").val() + "TNC as deposit");
    }
  } else {
    alert("Deposit can't be empty.");
  }
});
//add结束
//add-comfirm开始
$('#frm_deposit_password').submit(() => {  
  if ($("#comfirm-password1").val() == "123456") {
    $.ajax({
      url: "http://47.254.39.10:20552",
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "updatedeposit",
        "params": [$("#wallet_add").text(),$("#info-channel-name").text(),"TNC",$(".add-input").val()],
        "id": 1
      }),
      // crossDomain: true,
      contentType: 'application/json',
      success: function(message) {
        if (message.result && message.result.error) {
          alert(message.result.error);
        } else if (message.error) {
          alert(message.error.message);
        } else {
          alert("Add deposit success!");
          transFace(FACE_BACK);
          $("#channel-btn").trigger('click');//refresh channel list
          $.ajax({
            url: "http://47.254.39.10:20552",
            type: "POST",
            data: JSON.stringify({
              "jsonrpc": "2.0",
              "method": "sendrawtransaction",
              "params": [$("#wallet_add").html(), message.result.channel_name, message.result.trad_info],
              "id": 1
            }),
            contentType: 'application/json',
            success: function(message) {
               
            },
            error: function(message) {
              alert("error");
            }
          });
        }
      },
      error: function(message) {
        alert("error");
      }
    });
    $("#comfirm-password1").val("");
  } else {
    alert("The password is incorrect.");
  }
  return false;
});
//add-comfirm结束
//transfer开始
$("#transfer-assets").focus(function() {
  transFace('.assets-form');
  // $(".assets-form").show();
});
$("#transfer-channel-name").focus(function() {
  transFace('.channel-edit-form');
  // $(".channel-edit-form").show();
});
$(".btn-transfer").click(function() {
  if (!$("#transfer-address").val()) {
    alert("Address can't be empty.");
    return;
  }
  if (!$("#transfer-assets").val()) {
    alert("Assets can't be empty.");
    return;
  }
  if (!$("#transfer-amount").val()) {
    alert("Amount can't be empty.");
    return;
  }
  if ($("#transfer-amount").val() > Number($("#total-amount").text())) {
    alert("The transfer amount should be less than the balance amount.");
    return;
  }
  transFace('.pay-form');
  // $(".curtain").show();
  // $(".pay-form").show();
  $("#comfirm-info").html("transfer " + $("#transfer-amount").val() + $("#amount-svg").text() + " to<br/>" + $("#transfer-address").val());
});
//transfer结束
//transfer on chain开始
$("#txonchain-assets").focus(function() {
  transFace('.assets-form');
});
$(".icon-contacts").click(function() {
  transFace('.channel-contacts-form');
});
$(".btn-txonchain").click(function() {
  if (!$("#txonchain-address").val()) {
    alert("Address can't be empty.");
    return;
  }
  if (!$("#txonchain-assets").val()) {
    alert("Assets can't be empty.");
    return;
  }
  if (!$("#txonchain-amount").val()) {
    alert("Amount can't be empty.");
    return;
  }
  if ($("#txonchain-amount").val() > Number($("#total-amount1").text())) {
    alert("The transfer amount should be less than the balance amount.");
    return;
  }
  transFace('.pay1-form');
  // $(".curtain").show();
  // $(".pay-form").show();
  $("#comfirm-info1").html("transfer " + $("#txonchain-amount").val() + $("#amount-svg1").text() + " to<br/>" + $("#txonchain-address").val());
});
$('#frm_txonchain_password').submit(() => {  
  if ($("#comfirm-password2").val() == "123456") {
    $.ajax({
      url: "http://47.254.39.10:20552",
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "txonchain",
        "params": [$("#wallet_add").text(),$("#txonchain-address").val(),"TNC",$("#txonchain-amount").val()],
        "id": 1
      }),
      // crossDomain: true,
      contentType: 'application/json',
      success: function(message) {
        if (message.result && message.result.error) {
          alert(message.result.error);
        } else if (message.error) {
          alert(message.error.message);
        } else {
          alert("Transfer success!");
          transFace('.index-form');
          //$("#channel-btn").trigger('click');//refresh channel list
        }
      },
      error: function(message) {
        alert("error");
      }
    });
    $("#comfirm-password2").val("");
  } else {
    alert("The password is incorrect.");
  }
  return false;
});
//transfer on chain结束
//assets开始
$("#NEO,#GAS,#TNC").click(function() {
  transFace();
  $("#regist-channel-assets, #transfer-assets,#txonchain-assets").val(this.id);
  $("#amount-svg,#amount-svg1").text(this.id).show();
});
//assets结束
//contacts开始
$(".contact-box").click(function() {
  transFace();
  $("#txonchain-address,#regist-channel-address").val($(this).children().text());
});
//contacts结束
//Payment开始
$('#frm_pay_password').submit(() => {  
  if ($("#comfirm-password").val() == "123456") {
    $.ajax({
      url: "http://47.254.39.10:20552",
      type: "POST",
      data: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "sendertoreceiver",
        "params": [$("#wallet_add").text(), $("#transfer-address").val(), $("#transfer-channel-name").val(), $("#transfer-assets").val(), $("#transfer-amount").val()],
        "id": 1
      }),
      contentType: 'application/json',
      success: function(message) {
        if (message.result == "SUCCESS") {
          alert("Transfer success!");
          transFace('.channel-edit-form', true);
          $("#channel-btn").trigger('click');//refresh channel list
          // $(".password-div").hide();
          // $(".success-div").show();
        } else {
          alert("error");
        }
      },
      error: function(message) {
        alert("error");
      }
    });
    $("#comfirm-password").val("");
  } else {
    alert("The password is incorrect.");
  }
  return false;
})
//Payment结束

$(".curtain").click(function() {
  transFace(FACE_BACK);
});

// On load
$(function() {
  placeholderFunction();
  contentWayPoint();

  if ($("#sign-up-agree").prop('checked')) {
    $(".btn-sign-up").removeAttr("disabled");
  } else {
    $(".btn-sign-up").attr('disabled', "true");
  }

  if ($("#transfer-assets").val() == "" || $("#transfer-assets").val() == null) {
    $("#amount-svg").hide();
  } else {
    $("#amount-svg").show();
  }
  if ($("#txonchain-assets").val() == "" || $("#txonchain-assets").val() == null) {
    $("#amount-svg1").hide();
  } else {
    $("#amount-svg1").show();
  }

$("#wallet_add,#wallet-address").html("ATiabWLxT5sLQpkppZDK9JmCF9wBFYpX3V");

setInterval(function(){  
      $.ajax({
        url: "http://47.254.39.10:20552",
        type: "POST",
        data: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "getbalanceonchain",
          "params": [$("#wallet_add").text(),"TNC"],
          "id": 1
        }),
        contentType: 'application/json',
        success: function(message) {
          $("#index-balance").text(message.result);
          $("#total-amount1").text(message.result);
          $("#total-amount2").text(message.result);
        },
        error: function(message) {
          //alert("Something wrong with your internet suddenly.");
        }
      });

  $.ajax({
    url: "http://47.254.39.10:20552",
    type: "POST",
    data: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getchannelstate",
      "params": [$("#wallet_add").html()],
      "id": 1
    }),
    contentType: 'application/json',
    success: function(message) {
      $('#channels').html('');
      if (message.result) {
        message.result.forEach((item) => {
          // if (item.tx_info && item.channel_state === 'State.OPEN') {
          if (item.tx_info) {
            var aa = item.channel_state.split('.');
            $(`<div class='channel-box'><p>${item.tx_info[1].address}</p><h5>Deposit:${item.tx_info[0].deposit}</h5><h5>Balance: ${item.tx_info[0].balance}</h5><h5>State: ${aa[1]}</h5></div>`)
              .appendTo('#channels').click(() => {
                transFace('.channel-info-form');
                // b = $(obj).attr("id").split("-")[1]; //获取点击了第几个div   
                $("#info-channel-name").text(item.channel_name);
                $("#info-receiver-addr").text(item.tx_info[1].address);
                $("#info-time").text(item.open_block);
                $("#info-sender-deposit").text(item.tx_info[0].deposit);
                $("#info-sender-balance").text(item.tx_info[0].balance);
                $("#info-state").text(aa[1]);
              });
          }
        });
      }
    },
    error: function(message) {
    }
  });
},2000);
});
/* common function*/
// 显隐密码
let hideShowPsw = (domId, imgId) => {
  let toType = $('#' + domId).attr('type') === 'text' ? 'password' : 'text';
  $('#' + domId).attr('type', toType);
  $('#' + imgId).attr('src', toType  === 'text' ? 'images/invisible.png' : 'images/visible.png');
}

// 自定转换 html: face-button data-action="[close|back]" / data-go="<dom selector>"
const FACE_BACK = -1, FACE_CLOSE = -2;
let $backFace, $modalStack = [], backStack = [];
/*
  toDom: [FACE_CLOSE | FACE_BACK | <DOM selector>]
  FACE_CLOSE 只关闭当前弹窗 FACE_BACK | [EMPTY] 关闭所有弹窗
  isReplace: 不记录当前离开的路径
*/
let hideAllModal = () => {
  if (!$modalStack.length) {
    return;
  }
  $modalStack.forEach((_$modal) => {
    _$modal.hide();
  });
  $modalStack = [];
  $('.curtain').hide();
}
let transFace = (toDom, isReplace) => {
  let isBack = false;
  if (!toDom || toDom === FACE_BACK || toDom === FACE_CLOSE) {
    if ($modalStack.length) { //  && $modal.is(':visible')
      if (toDom === FACE_CLOSE) {
        $modalStack.pop().hide();
        if (!$modalStack.length) {
          $('.curtain').hide();
        }
      } else {
        hideAllModal();
      }
      return;
    } else {
      toDom = '.' + backStack.pop();
      isBack = true;
    }
  }
  let $leave = $('.animate-box:visible'), $to = $(toDom);
  if ($to.data('animate-effect') === 'fadeInBottom') {
    $modalStack.push($to);
    $to.show().css('position', 'fixed');
    if ($to.outerHeight() > 500) {
      $to.css('top', (window.innerHeight - $to.outerHeight()) + 'px');
    }
    $('.curtain').show();
  } else {
    if (!isBack && !isReplace) {
      let dom = $leave.attr('class').match(/\S*-form/)[0];
      backStack = backStack.filter((_dom) => _dom !== dom);
      backStack.push(dom);
    }
    if (isReplace) {
      backStack = backStack.filter((_dom) => _dom !== toDom.replace('.', ''));
    }
    $to.show();
    hideAllModal();
    setTimeout(() => {
      $leave.hide().css('position', 'absolute');
      $to.css('position', 'static');
    }, 110);
  }
}

$('[face-button]').click(function () {
  let $this = $(this), action = $this.data('action'), go = $this.data('go');
  if (action) {
    if (action === 'back') {
      transFace(FACE_BACK);
    } else if (action === 'close') {
      transFace(FACE_CLOSE);
    }
  } else if (go) {
    transFace(go);
  }
});
/*$("#password_img").click(function() {
  if ($("#comfirm-password").prop("type") == "password") {
    $("#comfirm-password").prop('type', 'text');
    $("#password_img").prop('src', 'images/invisible.png');
  } else {
    $("#comfirm-password").prop('type', 'password');
    $("#password_img").prop('src', 'images/visible.png');
  }
});*/