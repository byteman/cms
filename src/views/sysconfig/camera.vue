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
        <el-button plain @click="onAddGB28181">新增GB28181</el-button>
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
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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

            <el-input v-model="camera.Name"></el-input>

          </el-form-item>

          <el-form-item label="是否启用">

            <el-input v-model="camera.enable"></el-input>

          </el-form-item>

          <el-form-item label="视频源类型">

            <el-input v-model="camera.srctype"></el-input>

          </el-form-item>
          <el-form-item label="传输协议">
            <el-input v-model="camera.transport"></el-input>
          </el-form-item>

          <el-form-item label="端口">
            <el-input v-model="camera.port"></el-input>
          </el-form-item>

          <el-form-item label="密码">
              <el-input v-model="camera.password"></el-input>
          </el-form-item>

        </el-col>

        <el-col :span="11">

          <el-form-item label="相机名称">

            <el-input v-model="camera.name"></el-input>

          </el-form-item>

          <el-form-item label="相机类型">

            <el-input v-model="camera.cameraType" ></el-input>

          </el-form-item>

          </el-form-item>

          <el-form-item label="URL">

            <el-input v-model="camera.url"></el-input>

          </el-form-item>

          <el-form-item label="IP地址">
            <el-input v-model="camera.ipaddr"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="camera.username"></el-input>
          </el-form-item>
        

        </el-col>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cameraConfig = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveCamera">保 存</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import { CommQuery } from '@/api/sysconfig'
import Channel from './channel'
export default {
  components: {
    Channel
  },
  data() {
    return {
      total: 50,
      showChannel: false,
      camera: {},
      cameraConfig: false,
      title: '相机详情',
      list: [],
      formInline: {
        name: ''
      }
    }
  },
  created() {
    console.log('camera mount')
  },
  mounted() {
    CommQuery(0x12003)
      .then(response => {
        this.list = response.data.data.channels
        console.log(this.list)
      })
      .catch(() => {})
  },
  methods: {
    onSubmit: function() {},
    onReset: function() {},
    onAddCamera: function() {
      this.showChannel = true
    },
    onAddGB28181: function() {},
    onPreviewConfig: function() {},
    handleClick(row) {
      console.log(row)
    },
    handleClose: function(){},
    handleSizeChange: function(){},
    handleCurrentChange: function(){},
    handleDetail(row) {
      this.cameraConfig = true
    },
    handleSaveCamera() {
      this.cameraConfig = false
    },
    formatType(row, column, cellValue) {
      console.log(cellValue)
      // 离线 0 在线 1 未启动 2
      if (row.cameraType === 'file') {
        return '视频文件'
      } else {
        return '其他'
      }
    },
    formatStatus(row, column, cellValue) {
      console.log(cellValue)
      // 离线 0 在线 1 未启动 2
      if (row.cameraState === 1) {
        return '禁用'
      } else {
        return '其他'
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
.el-form{
  overflow: hidden;
}

</style>
