<template>
  <div class="container">
    <table align="center" width="100%">
      <tr>
        <td>
          <label>抓拍记录配置</label>
          <div class="left-content">
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
        </td>
        <td>
          <label>抓拍参数配置</label>
          <div class="right-content">
            <el-form class="right-form">
              <el-form-item label="抓拍线程数" prop="snap_thread_num">
                <el-input v-model="snap_thread_num"></el-input>
              </el-form-item>
              <el-form-item label="抓拍照缓存大小" prop="snap_cache_vol">
                <el-input v-model="snap_cache_vol"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onConfigSave">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { Query } from '@/api/snap'
  import { RecordSave } from '@/api/snap'

  export default {
    data() {
      return {
        snap_thread_num: '',
        snap_cache_vol: '',
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
          console.log(response.data.data)
        })
        .catch(() => {})
    },
    beforeDestroy() {
    },
    methods: {
      onConfigSave() {
      },
      onRecordSave() {
        const facesave = '人脸图' in this.checkList ? 1 : 0
        const fullsave = '全景图' in this.checkList ? 1 : 0
        RecordSave(facesave, fullsave)
          .then(response => {
            this.$message('保存图片设置(重启后生效):' + response.data.message)
          })
          .catch(() => {})
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 99%;
    margin: 0 auto;
    border: 1px solid #dfe6ec;
    min-height: 600px;
  }

  .left-content {
    margin: 0 auto;
  }

  .right-content {
    margin: 0 auto;
  }
</style>
