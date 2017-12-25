<template>
  <div class="container">

    <div class="content">
      <el-form :inline="true" class="button-oper">
        <el-form-item>
          <el-button type="primary" @click="onAddCamera">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPreviewConfig">预览地址配置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="id" label="相机编号" width="200">
        </el-table-column>
        <el-table-column prop="name" label="相机名称" width="200">
        </el-table-column>
        <el-table-column prop="cameraType" label="相机类型" :formatter="formatType" width="150">
        </el-table-column>
        <el-table-column prop="cameraState" label="设备状态" :filters="cameraStatusFilters"
                         :filter-method="filterCameraStatus"
                         :formatter="formatStatus" width="150">
        </el-table-column>


        <el-table-column label="操作" align='center'>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small" @click="handleSnap(scope.row)">抓拍设置</el-button>
            <el-button type="text" size="small" @click="handlePreview(scope.row)">预览设置</el-button>
            <el-button type="text" size="small" @click="handleChannel(scope.row)">{{scope.row.cameraState |
              filterChannelStatus}}
            </el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>


    <el-dialog :title="title" :visible.sync="showChannel" width="50%" center>
      <el-form ref="form" :model="camera" label-width="100px">

        <el-col :span="11">

          <el-form-item label="相机编号">

            <el-input :disabled="filedEnable" v-model="camera.cameraId"></el-input>

          </el-form-item>

          <el-form-item label="是否启用">


            <el-switch :disabled="filedEnable"
                       v-model="camera.enable"
                       active-color="#13ce66"
                       inactive-color="#dfdfdf">
            </el-switch>
          </el-form-item>

          <el-form-item label="运算单元">

            <el-select :disabled="filedEnable" v-model="camera.protocal" placeholder="请选择运算单元" style="width:100%">
              <el-option
                v-for="item in calcOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人脸底库">
            <el-select :disabled="filedEnable" v-model="camera.group_id" placeholder="请选择人脸底库" style="width:100%">
              <el-option
                v-for="item in facedbs"
                :key="item.id"
                :label="item.group_name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="端口">
            <el-input :disabled="filedEnable" v-model="camera.cameraPort"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input :disabled="filedEnable" v-model="camera.cameraPwd"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="11">

          <el-form-item label="相机名称">

            <el-input :disabled="filedEnable" v-model="camera.cameraName"></el-input>

          </el-form-item>

          <el-form-item label="相机类型">


            <el-select :disabled="filedEnable" v-model="camera.cameraType" placeholder="请选择相机类型" style="width:100%">
              <el-option
                v-for="item in cameraTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="URL">

            <el-input :disabled="filedEnable" v-model="camera.cameraChannel"></el-input>

          </el-form-item>

          <el-form-item label="IP地址">
            <el-input :disabled="filedEnable" v-model="camera.cameraIp"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input :disabled="filedEnable" v-model="camera.cameraUser"></el-input>
          </el-form-item>


        </el-col>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChannel = false">取 消</el-button>
        <el-button type="primary" @click="onCameraBtnClick">{{cameraDlgBtnName}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="showSnap" width="30%" center>
      <el-form ref="form" :model="camera" label-width="100px">

        <el-form-item label="相机编号">
          <el-input disabled=true v-model="snap.id"></el-input>
        </el-form-item>

        <el-form-item label="最大人脸尺寸">
          <el-input v-model="snap.maxFaceSize"></el-input>
        </el-form-item>
        <el-form-item label="最小人脸尺寸">
          <el-input v-model="snap.minFaceSize"></el-input>
        </el-form-item>
        <el-form-item label="人脸过滤分数">
          <el-input v-model="snap.quality"></el-input>
        </el-form-item>
        <el-form-item label="ROI-X">
          <el-input v-model="snap.roiX"></el-input>
        </el-form-item>
        <el-form-item label="ROI-Y">
          <el-input v-model="snap.roiY"></el-input>
        </el-form-item>
        <el-form-item label="ROI-W">
          <el-input v-model="snap.roiW"></el-input>
        </el-form-item>
        <el-form-item label="ROI-H">
          <el-input v-model="snap.roiH"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSnap = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveSnap">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="showVms" width="30%" center>
      <el-form ref="form" :model="camera" label-width="100px">

        <el-form-item label="预览地址IP">
          <el-input v-model="vms.host"></el-input>
        </el-form-item>

        <el-form-item label="预览地址端口">
          <el-input v-model="vms.port"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showVms = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveVms">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="showPrew" width="30%" center>
      <el-form ref="form" :model="prew" label-width="100px">

        <el-form-item label="相机编号">
          <el-input disabled=true v-model="prew.id"></el-input>
        </el-form-item>

        <el-form-item label="绘制人脸框">
          <el-switch
            v-model="prew.enableDrawFace"
            active-color="#13ce66"
            inactive-color="#dfdfdf">
          </el-switch>

        </el-form-item>
        <el-form-item label="I帧间隔">
          <el-input v-model="prew.gop"></el-input>
        </el-form-item>
        <el-form-item label="视频质量">
          <el-select v-model="prew.videoQuality" placeholder="请选择视频质量" style="width:100%">
            <el-option
              v-for="item in vqOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showPrew = false">取 消</el-button>
        <el-button type="primary" @click="handleSavePrew">保 存</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import {CommQuery, CommPost, Modify, OperChannel} from "@/api/sysconfig";
  import Channel from "./channel";

  export default {
    components: {
      Channel
    },
    data() {
      return {
        total: 50,
        snap: {},
        prew: {},
        showChannel: false,
        showVms: false,
        showSnap: false,
        showPrew: false,
        cameraDialogState: 3, // 0 添加 1 详情 2 编辑.
        camera: {},
        vms: {
          host: "127.0.0.1",
          port: 554
        },
        title: "相机详情",
        list: [],
        formInline: {
          name: ""
        },
        imgOptions: [
          {
            value: "1",
            label: "原始大小"
          },
          {
            value: "2",
            label: "640x480"
          },
          {
            value: "3",
            label: "1280x720"
          },
          {
            value: "4",
            label: "1920x1080"
          }
        ],
        vqOptions: [
          {
            value: "1",
            label: "标清"
          },
          {
            value: "2",
            label: "高清"
          },
          {
            value: "3",
            label: "超清"
          }
        ],
        cameraTypeOptions: [
          {
            value: "rtsp",
            label: "RTSP"
          },
          {
            value: "hikcap",
            label: "海康抓拍相机"
          }
        ],
        calcOptions: [
          {
            value: "0",
            label: "CPU"
          },
          {
            value: "1",
            label: "显卡1"
          },
          {
            value: "2",
            label: "显卡2"
          },
          {
            value: "3",
            label: "显卡3"
          },
          {
            value: "4",
            label: "显卡4"
          }
        ],
        facedbs: [],
        cameraStatusFilters: [
          {text: "离线", value: "-1"},
          {text: "在线11", value: "0"},
          {text: "禁用11", value: "1"}
        ]
      };
    },
    created() {
      console.log("camera created");
    },
    mounted() {
      this.onRefresh()
      CommQuery(80001)
        .then(response => {
          this.facedbs = response.data.data.group_ids;
        })
        .catch(() => {
        });
    },

    filters: {
      filterChannelStatus: function (value) {
        switch (value) {
          case 1:
            return "启用通道";
          case -1:
            return "禁用通道";
          case 0:
            return "禁用通道";
        }
      }
    },
    computed: {
      // 计算属性的 getter
      cameraDlgBtnName() {
        // `this` 指向 vm 实例
        if (this.cameraDialogState === 1) return "关闭";
        else return "保存";
      },
      onCameraBtnClick() {
        if (this.cameraDialogState === 1) return this.closeDlg
        else if (this.cameraDialogState === 0) return this.handleSaveCamera
        else return this.handleEditCamera
      },
      filedEnable(name) {
        console.log("field =", this.cameraDialogState);
        // 详情，全部禁用
        if (this.cameraDialogState === 1) return true;
        else if (this.cameraDialogState === 0)
        // 添加,全部启用
          return false;
        else {
          // 编辑， ID启用
          if (name !== undefined) {
            if (name === "id") return true
          }
          return false
        }
      }
    },
    methods: {
      onSubmit: function () {
      },

      closeDlg() {
        console.log("close")
        this.showChannel = false;
      },
      onReset: function () {
      },
      onAddCamera: function () {
        this.cameraDialogState = 0;
        this.showChannel = true;
        this.camera = {}
      },
      onRefresh() {
        CommQuery(0x12003)
          .then(response => {
            this.list = response.data.data.channels;
            console.log(this.list);
          })
          .catch(() => {
          });
      },
      onAddGB28181: function () {
      },
      onPreviewConfig: function () {
        CommQuery(0x10314)
          .then(response => {
            var rtsp = response.data.data.rtspurl;
            var rtsps = rtsp.split(":");
            this.vms.host = rtsps[0];
            this.vms.port = rtsps[1];
            console.log(rtsp);

            this.showVms = true;
          })
          .catch(() => {
          });
      },
      handleSaveSnap() {
        console.log("edit camera");
        var chan = this.snap.id;
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x12004",
            channel: chan
          }
        };
        var snap = {
          snap: this.snap
        };
        console.log(snap);
        data.requestdata[chan] = snap;
        console.log(data);
        var msg = "保存成功";
        CommPost(data)
          .then(response => {
          })
          .catch(() => {
            msg = "保存失败";
          });
        this.$message(msg);
        this.showSnap = false;
      },
      handleSaveVms() {
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x10315",
            rtspurl: this.vms.host + ":" + this.vms.port
          }
        };

        CommPost(data)
          .then(response => {
            this.$message("保存成功");
            this.showVms = false;
          })
          .catch(() => {
            this.$message("保存失败");
          });
      },
      handleRemove(row) {
        this.$confirm("确认删除该设备, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            OperChannel(0x12001, row.id)
              .then(response => {
                this.onRefresh();
              })
              .catch(() => {
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      str2json(jsonstr) {
        return eval("(" + jsonstr + ")");
      },
      handleChannel(row) {
        var state = 1;
        console.log("camerestate=", row.cameraState);
        if (row.cameraState === 0) {
          ///已经禁用
          state = 0;
        }

        console.log("state=", state);
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x12007",
            channel: row.id,
            enable: state
          }
        };

        CommPost(data)
          .then(response => {
            this.showVms = false;
            this.onRefresh();
          })
          .catch(() => {
          });
      },
      handleROI(row) {
      },
      handleClose: function () {
      },
      handleSizeChange: function () {
      },
      handleCurrentChange: function () {
      },
      handleSnap(row) {
        OperChannel(0x12000, row.id)
          .then(response => {
            var tmp = this.str2json(response.data.data);

            this.snap = tmp.snap;
            this.snap.id = row.id;
            console.log(this.camera);
            this.showSnap = true;
          })
          .catch(() => {
          });
      },
      handlePreview(row) {
        OperChannel(0x12000, row.id)
          .then(response => {
            var tmp = this.str2json(response.data.data)
            console.log('tmp')
            console.log(tmp)
            this.prew = tmp.preview
            if (tmp.preview.enableDrawFace === '1') {
              console.log('a')
              this.prew.enableDrawFace = true
            } else if (tmp.preview.enableDrawFace === '0') {
              console.log('b')
              this.prew.enableDrawFace = false
            } else if (tmp.preview.enableDrawFace === 1) {
              console.log('a')
              this.prew.enableDrawFace = true
            } else if (tmp.preview.enableDrawFace === 0) {
              console.log('b')
              this.prew.enableDrawFace = false
            }
            this.prew.id = row.id
            console.log(this.prew)
            this.showPrew = true
          })
          .catch(() => {
          });
      },
      handleDetail(row) {
        this.cameraDialogState = 1;
        OperChannel(0x12000, row.id)
          .then(response => {
            var tmp = this.str2json(response.data.data)
            if (tmp.ags.enable === '1') {
              console.log('a')
              tmp.ags.enable = true
            } else if (tmp.ags.enable === '0') {
              console.log('b')
              tmp.ags.enable = false
            } else if (tmp.ags.enable === 1) {
              console.log('a')
              tmp.ags.enable = true
            } else if (tmp.ags.enable === 0) {
              console.log('b')
              tmp.ags.enable = false
            }
            this.camera = tmp.ags
            this.showChannel = true
          })
          .catch(() => {
          })
      },
      handleEdit(row) {
        this.cameraDialogState = 2
        OperChannel(0x12000, row.id)
          .then(response => {
            var tmp = this.str2json(response.data.data)
            console.log(tmp)
            if (tmp.ags.enable === '1') {
              console.log('a')
              tmp.ags.enable = true
            } else if (tmp.ags.enable === '0') {
              console.log('b')
              tmp.ags.enable = false
            } else if (tmp.ags.enable === 1) {
              console.log('a')
              tmp.ags.enable = true
            } else if (tmp.ags.enable === 0) {
              console.log('b')
              tmp.ags.enable = false
            }
            this.camera = tmp.ags
            console.log(this.camera)
            this.showChannel = true
          })
          .catch(() => {
          })
      },
      handleEditCamera() {
        console.log("edit camera");
        var chan = this.camera.cameraId;
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x12004",
            channel: chan
          }
        }
        var ags = {
          ags: this.camera
        }
        console.log(ags)
        if (this.camera.enable) {
          ags.ags.enable = 1
        } else {
          ags.ags.enable = 0
        }
        console.log(ags)
        data.requestdata[chan] = ags
        console.log(data)

        CommPost(data)
          .then(response => {
            this.showChannel = false
            this.onRefresh()
          })
          .catch(() => {
            this.$message("保存失败")
          })
        this.showChannel = false
        this.onRefresh()
      },
      handleSaveCamera() {
        console.log("save camera");

        var chan = this.camera.cameraId;
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x12002",
            channel: chan
          }
        };
        var ags = {
          ags: this.camera
        };
        delete ags.ags.enable;
        console.log(ags);
        if (ags.enable) {
          ags.ags.enable = 1;
        } else {
          ags.ags.enable = 0;
        }
        console.log(ags);
        data.requestdata[chan] = ags;
        console.log(data);

        CommPost(data)
          .then(response => {
            this.showChannel = false;
            this.onRefresh()
          })
          .catch(() => {
            this.$message("保存失败");
          });
        this.showChannel = false
        this.onRefresh()
      },
      handleSavePrew() {
        console.log("edit prew");
        var chan = this.prew.id;
        var data = {
          requestdata: {
            token: 1,
            bcode: "0x12004",
            channel: chan
          }
        }
        var tmp = this.prew
        if (this.prew.enableDrawFace === true) {
          tmp.enableDrawFace = 1
        } else {
          tmp.enableDrawFace = 0
        }
        var preview = {
          preview: tmp
        }

        console.log(preview)
        data.requestdata[chan] = preview
        console.log(data)

        Modify(data)
          .then(response => {
            this.$message('保存结果：' + response.data.message)
          })
          .catch(() => {
            this.$message('保存失败')
          })
        this.showPrew = false;
      },
      handleEnableChannel(enable) {
      },

      filterCameraStatus(value, row) {
        console.log(value, row.cameraState);
        return value === row.cameraState;
      },
      formatType(row, column, cellValue) {
        console.log(cellValue);
        // 离线 0 在线 1 未启动 2
        if (row.cameraType === "file") {
          return "视频文件";
        } else {
          return "其他";
        }
      },
      formatStatus(row, column, cellValue) {
        console.log("-----------------", cellValue);
        // 离线 0 在线 1 未启动 2
        if (row.cameraState === 0) {
          return "在线";
        } else if (row.cameraState === -1) {
          return "离线";
        } else if (row.cameraState === 1) {
          return "禁用";
        }
      }
    }
  };
</script>

<style scoped>
  .container {
    width: 99%;
    margin: 0 auto;
    border: 1px solid #dfe6ec;
    min-height: 600px;
  }

  .el-form-item {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .content {
    width: 97%;
    margin: 0px auto;
  }

  .header {
    /* margin-top:10px;
     line-height:50px;
    margin-bottom: 10px; */
    padding: 24px;

    background-color: rgb(248, 249, 248);
    height: 80px;
  }

  .footer {
    height: 50px;
    margin-top: 10px;
    margin-right: 90px;
    text-align: right;
  }

  .el-card__header {
    padding: 1px 2px;
  }

  .tree {
    height: 1000px;
  }

  .el-form {
    overflow: hidden;
  }
</style>
