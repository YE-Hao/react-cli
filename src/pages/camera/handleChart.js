import {message} from 'antd';
import Chat from './chart';
function getTime (timestamp) {
  let date = new Date(timestamp);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' '
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
export default function chart ($){
  if(!window.RTCPeerConnection) {
    message.error('你的浏览器不支持视频聊天！')
    return;
  }
  let userInfo = null,
  userList = null;
  let currentChat = null;
  let remoteUserId = 0;
  const msgHandler = {
    error (data) {
      message.error(data.msg);
    },
    userInfo (data) {
      userInfo = data;
      $('.your-user-id').textContent = 'User ' + userInfo.id;
      $('.your-ip-addr').textContent = userInfo.ip;
    },
    userList (data) {
        let tpl = '';
        data.forEach(user => {
            if (user.userId !== userInfo.id) {
                tpl += `<tr data-user-id="${user.userId}">
                    <td>User ${user.userId}</td>
                    <td>${user.ip}</td>
                    <td>${getTime(user.loginTime)}</td>
                    <td><button class="call-btn">呼叫</button></td>
                </tr>`;
            }
        });
        $('.online-user-list tbody').innerHTML = tpl;
    },
    // 收到对方发给我的candidate
    remoteCandidate (data) {
      currentChat.addCandidate(data.candidate);
    },
    // 收到聊天邀请
    recvCall (data) {
        $('.ringing-ip').textContent = data.ip;
        $('.ringing-user-id').textContent = data.userId;
        $('.answer-box').style.display = 'block';
        remoteUserId = data.userId;
    },
    // 聊天被对方拒绝
    callRejected () {
        message.success('呼叫被对方拒绝');
    },
    // 对方同意聊天
    callAnswered () {
        message.success('对方同意聊天');
        currentChat.call();
    },
    // 收到对方的offer
    offer (data) {
        let offer = data.desc;
        currentChat.answer(offer);
    },
    // 收到对方的answer
    answer (data) {
        let offer = data.desc;
        currentChat.onReceiveAnswer(offer);
    }
  }
  var ws = new WebSocket("ws://10.10.30.125:8803");
    ws.sendData = function (data) {
        ws.send(JSON.stringify(data));
    };
    ws.onopen = function() {
        console.log('connected successfully');
    };
    ws.onmessage = function (event) {
      // console.log('recv from server', event.data);
      let data = JSON.parse(event.data);
      if (typeof msgHandler[data.type] === 'function') {
          msgHandler[data.type](data.data);
      } else {
          console.error('Unkown msg type: ' + data.type);
      }
      // switch (data.type) {
      //     case 'setUserId':
      //         userId = data.
      // }
    }
    ws.onclose = function () {
      message.error('与服务器的连接断开（10分钟自动断开）', 'error');
    };
    ws.onerror = function () {
      message.error('websocket连接发生错误', 'error');
    };
     // 发起对话
     $('.online-user-list').addEventListener('click', event => {
      if (event.target.classList.contains('call-btn')) {
          currentChat && currentChat.closeConnection();
          let userId = event.target.parentNode.parentNode.dataset.userId;
          let chat = new Chat(ws, userId, $);
          currentChat = chat;
          chat.ring();
      }
    });
     // 应答
     $('.answer-call').addEventListener('click', event => {
      currentChat && currentChat.closeConnection();
      let chat = new Chat(ws, remoteUserId, $);
      chat.initConnect();
      currentChat = chat;
      ws.sendData({
          type: 'answerCall'
      });
      $('.answer-box').style.display = 'none';
    });
     // 拒绝
     $('.reject-call').addEventListener('click', event => {
      ws.sendData({
          type: 'rejectCall' 
      });
      $('.answer-box').style.display = 'none';
    });
    // 关闭连接
    $('.close-connection-btn').addEventListener('click', event => {
        currentChat && currentChat.closeConnection();
        currentChat = null;
    });
}