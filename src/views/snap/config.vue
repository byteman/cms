<template>
  <div class="container">

    <div class="left-content" align='center'>
      <label>抓拍记录配置</label>
      <el-form class="left-form">
        <el-form-item label="保存图片">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="人脸图"></el-checkbox>
            <el-checkbox label="全景图"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onRecordSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="right-content" align='center'>
      <label>抓拍参数配置</label>
      <el-form class="right-form">
        <el-form-item label="抓拍线程数" prop="snap_thread_num">
          <el-select v-model="snap_thread_num" placeholder="请选择">
            <el-option v-for="item in snap_thread_num_options" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfigSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Query, RecordSave, ConfigSave} from '@/api/snap'

  export default {
    data() {
      return {
        snap_thread_num_options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '4'
        }, {
          value: '选项4',
          label: '6'
        }, {
          value: '选项5',
          label: '8'
        }],
        snap_thread_num: '',
        region: '',
        checkList: []
      }
    },
    created() {
    },
    mounted() {
      this.checkList = []
      Query(0x12011)
        .then(response => {
          if (response.data.data.facesave === 1) {
            this.checkList.push('人脸图')
          }
          if (response.data.data.fullsave === 1) {
            this.checkList.push('全景图')
          }
          this.snap_thread_num = response.data.data.encodetasksize
          console.log(response.data.data)
        })
        .catch(() => {
        })
    },
    beforeDestroy() {
    },
    methods: {
      onConfigSave() {
        ConfigSave(this.snap_thread_num)
          .then(response => {
            this.$message('保存抓拍线程数(重启后生效):' + response.data.message)
          })
          .catch(() => {
          })
      },
      onRecordSave() {
        const facesave = (this.checkList.indexOf('人脸图') !== -1) ? 1 : 0
        const fullsave = (this.checkList.indexOf('全景图') !== -1) ? 1 : 0
        RecordSave(facesave, fullsave)
          .then(response => {
            this.$message('保存图片设置(重启后生效):' + response.data.message)
          })
          .catch(() => {
          })
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 99%;
    height:99%;
    margin: 0 auto;
    border: 1px solid #dfe6ec;
    min-height: 600px;
  }

  .left-content {
    position: absolute;
    left: 20%;
    top: 40%;
    width: 20%
  }

  .right-content {
    position: absolute;
    right: 20%;
    top: 40%;
    width: 20%
  }
</style>
