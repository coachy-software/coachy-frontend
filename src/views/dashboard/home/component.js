export default {
  // created() {
  //   axios.get(`${API_URL}/users/me`, {
  //     headers: {
  //       'Authorization': `Basic ${localStorage.getItem('token')}`
  //     },
  //     withCredentials: true
  //   })
  //   .then(() => {
  //     let socket = new SockJS("http://localhost:3000/ws");
  //     let stompClient = Stomp.over(socket);
  //
  //     stompClient.connect({}, () => {
  //       stompClient.subscribe('/user/queue/private', msgOut => {
  //         console.log("received a message: " + msgOut)
  //       });
  //
  //       stompClient.send(`/app/chat.message.private`,
  //           JSON.stringify({from: 'bmstefanski', to: "bmstefanski2", text: 'test message queue xd'}), {});
  //     });
  //   })
  // }
}
