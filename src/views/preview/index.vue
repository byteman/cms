<template>
<div class="container">
  <div class="preview-content">
    <div class="tree-content">
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
      <el-tree
        class="filter-tree"
        :data="data2"
        :highlight-current="true"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        node-key="id"
        @node-click="playVideo"
        :render-content="renderContent"
        ref="tree2">
      </el-tree>
    </div>
    <div class="video-content">
      <div id="cloudwalkwebobj" style=" margin: 0 auto;" align="center">
      </div>
      <div style="margin-top:-200px;margin-left:280px;">
        <span style="font-size:25px;">点击</span>
        <a style="font-size:25px;color:red;text-decoration:underline;" href="static/ieCloudWalkSetup1.0.1.20171206.exe">这里</a>
        <span style="font-size:25px;">下载插件</span>
      </div>
    </div>
    <div class="recog-content">
      <p>比对记录</p>
      <ul>
        <li v-for="value in recogObjs">
          <div class="recog-info">
            <div class="recog-image">
              <div class="catchPhoto">
                <span class="small_infor" v-if="value.time">{{value.time}}</span>
                <img v-bind:src="value.img1"/>
              </div>
              <p>vs</p>
              <div class="catchPhoto">
                <span class="small_infor"  v-if="value.libName">{{value.libName}}</span>
                <img v-bind:src="value.img2"/>
              </div>
            </div>
            <div class="recog-text">
              <p class="recog-score">{{value.score}}</p>
              <p></p>
              <p>{{value.time}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="capture-content">
      <p>实时抓拍人像</p>
      <ul>
        <li v-for="value in captureObjs">
          <img v-bind:src="value.img"/>
          <p>{{value.time}}</p>
        </li>
      </ul>
    </div>

  </div>
</div>

</template>

<script>
import { postCameraPreview, getRtspUrl, getTree } from "@/api/preview";
import BrowserDetect from "@/utils/detect";
import ReconnectingWebSocket from "@/utils/reconnectwebsocketclient";

export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  data() {
    return {
      filterText: "",
      cloudwalkobj: "",
      captureIndex: 0,
      recogIndex: 0,
      wsJsonObj: {},
      captureObjs: [],
      recogObjs: [],
      data2: [
        {
          id: 1,
          label: "摄像头列表",
          isOpen: 0,
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {},
  mounted() {
    BrowserDetect.init();
    getTree()
      .then(response => {
        let json = response.data;
        if (json !== undefined && json.status === 0) {
          for (var i = 0; i < json.data.channels.length; i++) {
            let channelId = json.data.channels[i].id;
            let channelName = json.data.channels[i].name;
            getRtspUrl(channelId)
              .then(response => {
                let res = response.data;
                if (res !== undefined && res.status === 0) {
                  let jsonData = eval("(" + res.data + ")");
                  let rtspUrl = jsonData.preview.url;
                  let Device = new Object();
                  Device.id = jsonData.ags.cameraId;
                  Device.label = jsonData.ags.cameraName;
                  Device.status = "1";
                  Device.url = rtspUrl;
                  Device.isOpen = 0;
                  this.data2[0].children.push(Device);
                }
              })
              .catch(() => {});
          }
        }
      })
      .catch(() => {});
    this.cloudwalkobj = document.createElement("object");
    let el = document.getElementById("cloudwalkwebobj");
    this.create(el);
  },
  beforeDestroy() {},
  methods: {
    renderContent(h, { node, data, store }) {
      if (data.isOpen === 0) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <div class="cameraStatusClose" style = "width:22px;height: 18px;margin-top:3px; float: left;background: url('/src/assets/common_search/cameraClose.png') no-repeat;background-size: 100%;" />
              <span>&nbsp;{node.label}</span>
            </span>
          </span>
        );
      } else if (data.isOpen === 1) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <div class="cameraStatusOpen" style="width:22px;height: 18px; margin-top:3px; float: left;background: url('/src/assets/common_search/cameraOpen.png') no-repeat;background-size: 100%;"/>
              <span>&nbsp;{node.label}</span>
            </span>
          </span>
        );
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    playVideo(obj, node, self) {
      let channelId = obj.id;
      let cameraUrl = obj.url;
      let status = obj.isOpen;
      if (status === 0) {
        this.openCam(channelId, cameraUrl);
        this.$refs.tree2.setCheckedKeys([1]);
        obj.status = 1;
      } else if (status === 1) {
        this.closeCam(channelId);
      }
    },
    create(targetE) {
      let cloudwalkobj = this.cloudwalkobj;
      cloudwalkobj.id = "CloudWalkSDKPlugin";
      cloudwalkobj.width = 780;
      cloudwalkobj.height = 500;
      let bDet = BrowserDetect.browser;
      if ("Explorer" === bDet) {
        cloudwalkobj.classid = "CLSID:AB61579B-9111-440B-B868-28634A100131"; //IE
      } else if ("Firefox" === bDet) {
        cloudwalkobj.type = "application/x-npCloudPlay"; //Firefox
      } else if ("Chrome" === bDet) {
        cloudwalkobj.type = "application/x-npCloudPlay"; //Chrome
      } else {
        cloudwalkobj.type = "application/x-npCloudPlay";
      }
      targetE.appendChild(cloudwalkobj);
      //注册ocx回调函数
      BrowserDetect.registerCallBack(
        cloudwalkobj,
        "cwEventNotify",
        this.cwEventNotifyEvt
      );

      if (cloudwalkobj.valid === undefined && !cloudwalkobj.valid) {
        this.$message.error("插件不支持！请更换浏览器！");
        return false;
      }

      if (cloudwalkobj.cwGetVersions() !== '1.0.1.20171206') {
        this.$message.warning("插件版本不匹配！安装时请关闭浏览器！");
        return false;
      }

      cloudwalkobj.cwSetFramCash(3);
      cloudwalkobj.cwSetWndCount(4);
      cloudwalkobj.cwSetShowOSD(0);
      cloudwalkobj.cwSetConnectWay(1);
    },
    openCam(devid, url) {
      let cloudwalkobj = this.cloudwalkobj;
      let rooter = new Object();
      rooter.method = "open";

      let paramer = new Object();
      paramer.deviceId = devid;
      paramer.strUrl = url;
      rooter.param = paramer;

      let info = JSON.stringify(rooter);
      let n = cloudwalkobj.cwDisplayGDI(0);
      let m = cloudwalkobj.cwHardDecode(0);
      let nRet = cloudwalkobj.cwSendCmd(info);
    },
    closeCam(devid) {
      let cloudwalkobj = this.cloudwalkobj;
      let rooter = new Object();
      rooter.method = "close";

      let paramer = new Object();
      paramer.deviceId = devid;
      rooter.param = paramer;

      let info = JSON.stringify(rooter);
      let nRet = cloudwalkobj.cwSendCmd(info);
    },
    cwEventNotifyEvt(jsInfo) {
      let j = JSON.parse(jsInfo);
      let channelId = j.param.deviceId;
      console.log(j);
      if ("opened" === j.method) {
        let childrenArray = this.data2[0].children;
        for (var t in childrenArray) {
          if (childrenArray[t].id === channelId) {
            this.data2[0].children[t].isOpen = 1;
          }
        }
        this.SnapWebSocket(
          channelId,
          function fnSuc() {},
          function fnClosed() {},
          function fnNoSurrpot() {
            this.$message.warning("浏览器不支持webSocket！");
          }
        );
      } else if ("playevent" === j.method && 8 === j.param.type) {
        postCameraPreview(channelId)
          .then(response => {})
          .catch(() => {});
      } else if (j.method === "closed") {
        let childrenArray = this.data2[0].children;
        for (let t in childrenArray) {
          if (childrenArray[t].id === channelId) {
            this.data2[0].children[t].isOpen = 0;
          }
        }
        this.wsJsonObj[channelId].close();
      }
    },
    SnapWebSocket(cameraId, fnSucc, fnClosed, fnNoSurrport) {
      let wsJsonObj = this.wsJsonObj;
      let captureObjs = this.captureObjs;
      let recogObjs = this.recogObjs;
      if ("WebSocket" in window) {
        if (wsJsonObj[cameraId] !== undefined) {
          wsJsonObj[cameraId].close();
          delete wsJsonObj[cameraId];
          wsJsonObj[cameraId] = null;
        }

        let wsc = new ReconnectingWebSocket(
          // 打包之前修改修改
          // "ws://" + location.hostname + ':9980' + "/" + cameraId,
          "ws://" + process.env.SOCKET_API + "/" + cameraId,
          null,
          { debug: false, reconnectInterval: 4000 }
        );
        wsc.onopen = function(e) {
          wsJsonObj[cameraId] = wsc;
          fnSucc();
          console.log("WebSocketClient connected:", e);
        };
        wsc.onmessage = function(evt) {
          let msg = eval("(" + evt.data + ")");
          // console.log(msg);
          if (msg.top_scores !== undefined) {
            console.log('走这里');
            // console.log(msg);
            let live_id = msg.live_id;
            let channel_id = msg.channel_id;
            let lib_name= msg.libName;
            // console.log(lib_name);
            let live_face = "data:image/jpg;base64," + msg.live_face;
            let registered_face = "data:image/jpg;base64," + msg.registered_face_0;
            let top_scores = parseInt(msg.top_scores * 100) + "%";
            for (let t in recogObjs) {
              if (recogObjs[t].liveId === live_id) {
                recogObjs[t].time = "通道：" + channel_id;
                recogObjs[t].img1 = live_face;
                recogObjs[t].img2 = registered_face;   // 注册照
                recogObjs[t].score = top_scores;     // 评分
                recogObjs[t].libName = '底库：'+lib_name;    // 底库名称
                return;
              }
            }
            let recogObj ={};
            recogObj.liveId = live_id;
            recogObj.time = "通道：" + channel_id;    // 通道信息
            recogObj.img1 = live_face;    // 抓拍照
            recogObj.img2 = registered_face;   // 注册照
            recogObj.libName =  '底库：'+lib_name;   // 底库名称
            recogObj.score = top_scores;   // 评分
            if (recogObjs.length === 3) {
              recogObjs.shift();
            }
            recogObjs.push(recogObj);
          } else {
            console.log('我炸这');
            let track_id = msg.track_id;
            let channel_id = msg.channel_id;    // 通道id
            let img = "data:image/jpg;base64," + msg.live_face;
            for (let t in captureObjs) {
              if (captureObjs[t].trackId === track_id) {
                captureObjs[t].time = "通道：" + channel_id;
                captureObjs[t].img = img;
                return;
              }
            }
            let captureObj = {};
            captureObj.trackId = track_id;
            captureObj.time = "通道：" + channel_id;
            captureObj.img = img;
            if (captureObjs.length === 10) {
              captureObjs.shift();
            }
            captureObjs.push(captureObj);
          }
        };
        wsc.onclose = function(evt) {
          console.log("WebSocket closed.");
          // fnClosed();
        };
        wsc.onerror = function(evt) {
          // fnClosed()
        };
      } else {
        fnNoSurrport();
      }
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 280px;
  margin: 10px 20px;
}
.el-tree {
  background: #f8f8f8;
}
.navbar {
  min-width:1500px;
}
.container{
  width:100%;
  overflow-x:auto;
  overflow-y:hidden;
}

.preview-content {
  width: 1480px;
  height: 730px;
  border: 1px solid #e4e4e4;
  /*margin: 20px 0 0 15px;*/
}
.tree-content {
  width: 320px;
  height: 500px;
  float: left;
  background: #f8f8f8;
}

.video-content {
  width: 780px;
  height: 500px;
  float: left;
}
.recog-content {
  width: 377px;
  height: 500px;
  float: left;
}
.recog-content > p {
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0;
  margin-left: 10px;
  font-weight: bold;
  font-size: 14px;
}
.recog-content > ul {
  margin: 0;
  padding: 0 10px;
  height: 450px;
  display: block;
  list-style: none;
}
.recog-content > ul > li {
  height: 150px;
  width: 357px;
  display: block;
  margin: 0;
}
.recog-info {
  width: 357px;
  height: 150px;
  padding: 5px 0;
}
.recog-image {
  width: 217px;
  height: 140px;
  float: left;
  background: #ebebeb;
}
.small_infor{
  position: absolute;
  width: 90px;
  height: 24px;
  background: rgba(0,0,0,0.4);
  bottom: 0;
  left:0;
  font-size: 14px;
  color: #eee;
  text-align: center;
  line-height: 24px;
}

.catchPhoto{
  position: relative;
  width: 90px;
  height: 130px;
  margin: 5px;
  border: 0;
  float: left;
}
.catchPhoto img {
  width: 90px;
  height: 130px;
}
.recog-image p {
  display: block;
  width: 17px;
  float: left;
  height: 140px;
  line-height: 140px;
  text-align: center;
  margin: 0;
  border: 0;
  font-size: 17px;
  color: #45bce3;
}
.recog-text {
  width: 140px;
  height: 140px;
  float: left;
  background: #f5f5f5;
}
.recog-text > p {
  width: 120px;
  height: 40px;
  margin: 0 10px;
  line-height: 40px;
}
.recog-score {
  color: #59abfc;
  font-size: 20px;
  border-bottom: 1px solid #ccc;
}
.capture-content {
  margin-top: 500px;
  width: 100%;
  height: 230px;
}
.capture-content > p {
  height: 50px;
  line-height: 50px;
  display: block;
  margin: 0;
  margin-left: 10px;
  font-weight: bold;
  font-size: 14px;
}
.capture-content > ul {
  margin: 0;
  padding: 0 20px;
  height: 180px;
  display: block;
  list-style: none;
}
.capture-content > ul > li {
  height: 180px;
  width: 140px;
  float: left;
  display: block;
}
.capture-content > ul > li > img {
  display: block;
  width: 90px;
  height: 120px;
  margin: 10px auto;
}
.capture-content > ul > li > p {
  text-align: center;
  font-size: 10px;
  display: block;
  height: 20px;
  line-height: 20px;
}
.cameraStatusClose {
  width: 22px;
  height: 18px;
  float: left;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/common_search/cameraClose.png");
}
.cameraStatusOpen {
  width: 22px;
  height: 18px;
  float: left;
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/common_search/cameraOpen.png");
}
</style>

