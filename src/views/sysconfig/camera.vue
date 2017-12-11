<template>
  <div class="container">
    <div class="header">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="相机名称">
        <el-input v-model="formInline.name" placeholder="请输入相机名称"></el-input>
        </el-form-item>
         <el-form-item label="相机编号">
        <el-input v-model="formInline.name" placeholder="请输入相机编号"></el-input>
        </el-form-item>
        
        <el-form-item>
        <el-button plain @click="onSubmit">查询</el-button>
        </el-form-item>
          <el-form-item>
        <el-button plain @click="onReset">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
  
    <div class="content">
       <el-form :inline="true" class="button-oper">      
        <el-form-item>
        <el-button plain @click="onAddCamera">新增</el-button>
        </el-form-item>
       <el-form-item>
        <el-button plain @click="onPreviewConfig">预览地址配置</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" >

      <el-table-column type="selection"width="55">
      </el-table-column>

      <el-table-column prop="id" label="相机编号">
      </el-table-column>
      <el-table-column prop="name" label="相机名称">
      </el-table-column>
      <el-table-column prop="cameraType" label="相机类型" :formatter="formatType">
      </el-table-column>
      <el-table-column prop="cameraState" label="设备状态" :formatter="formatStatus">
      </el-table-column>
        <el-table-column prop="stream_status" label="视频流状态" >
      </el-table-column>

          <el-table-column label="操作" width="300" align='center'>
          <template slot-scope="scope">

          <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
               <el-button type="text" size="small">抓拍设置</el-button>
                <el-button type="text" size="small">预览设置</el-button>
              <el-button type="text" size="small">禁用通道</el-button>
               <el-button type="text" size="small">ROI设置</el-button>
            </template>
          </el-table-column>
  
      </el-table>

      <div class="footer">
        <div class="block">
          <el-pagination layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
 

   <el-dialog :title="title" :visible.sync="showChannel" width="50%" center >   
      <el-form ref="form" :model="camera" label-width="100px">

        <el-col :span="11">

          <el-form-item label="相机编号">

            <el-input v-model="camera.cameraId"></el-input>

          </el-form-item>

          <el-form-item label="是否启用">

          
              <el-switch
              v-model="camera.enable"
                active-color="#13ce66"
                inactive-color="#dfdfdf">
            </el-switch>
          </el-form-item>

          <el-form-item label="运算单元">
 
            <el-select v-model="camera.protocal" placeholder="请选择运算单元" style="width:100%">
                <el-option
                  v-for="item in calcOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人脸底库">
            <el-select v-model="camera.group_id" placeholder="请选择人脸底库" style="width:100%">
                <el-option
                  v-for="item in facedbs"
                  :key="item.id"
                  :label="item.group_name"
                  :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="端口">
            <el-input v-model="camera.cameraPort"></el-input>
          </el-form-item>

          <el-form-item label="密码">
              <el-input v-model="camera.cameraPwd"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="11">

          <el-form-item label="相机名称">

            <el-input v-model="camera.cameraName"></el-input>

          </el-form-item>

          <el-form-item label="相机类型">

          
            <el-select v-model="camera.cameraType" placeholder="请选择相机类型" style="width:100%">
                <el-option
                  v-for="item in cameraTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>

          </el-form-item>

          </el-form-item>

          <el-form-item label="URL">

            <el-input v-model="camera.cameraChannel"></el-input>

          </el-form-item>

          <el-form-item label="IP地址">
            <el-input v-model="camera.cameraIp"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="camera.cameraUser"></el-input>
          </el-form-item>
        

        </el-col>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChannel = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveCamera">保 存</el-button>
      </span>
    </el-dialog>
  
  <el-dialog :title="title" :visible.sync="showVms" width="30%" center >   
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
  
  </div>
  
</template>

<script>
import { CommQuery, CommPost, OperChannel } from "@/api/sysconfig";
import Channel from "./channel";
export default {
  components: {
    Channel
  },
  data() {
    return {
      total: 50,
      showChannel: false,
      showVms: false,
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
          label: "显卡3"
        }
      ],
      facedbs: []
    };
  },
  created() {
    console.log("camera mount");
  },
  mounted() {
    this.onRefresh();
    CommQuery(80001)
      .then(response => {
        this.facedbs = response.data.data.group_ids;
      })
      .catch(() => {});
  },
  methods: {
    onSubmit: function() {},
    onReset: function() {},
    onAddCamera: function() {
      this.showChannel = true;
      this.camera = {};
    },
    onRefresh() {
      CommQuery(0x12003)
        .then(response => {
          this.list = response.data.data.channels;
          console.log(this.list);
        })
        .catch(() => {});
    },
    onAddGB28181: function() {},
    onPreviewConfig: function() {
      CommQuery(0x10314)
        .then(response => {
          var rtsp = response.data.data.rtspurl;
          var rtsps = rtsp.split(":");
          this.vms.host = rtsps[0];
          this.vms.port = rtsps[1];
          console.log(rtsp);
          this.showVms = true;
        })
        .catch(() => {});
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
          this.showVms = false;
        })
        .catch(() => {});
    },
    handleRemove(row) {
      this.$confirm('确认删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          OperChannel(0x12001, row.id)
            .then(response => {})
            .catch(() => {});
          this.onRefresh();
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
    handleClose: function() {},
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    handleDetail(row) {
      OperChannel(0x12000, row.id)
        .then(response => {
          var tmp = this.str2json(response.data.data);

          this.camera = tmp.ags;
          console.log(this.camera);
          this.showChannel = true;
        })
        .catch(() => {});
    },
    handleSaveCamera() {
      console.log(this.camera);

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
      console.log("-----------------");
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
        })
        .catch(() => {});
      this.showChannel = false;
      this.onRefresh();
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
      console.log(cellValue);
      // 离线 0 在线 1 未启动 2
      if (row.cameraState === 1) {
        return "禁用";
      } else {
        return "其他";
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
