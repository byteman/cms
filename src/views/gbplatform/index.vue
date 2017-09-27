<template>
  <div>
    <div v-if="status==1">

      <el-table :data="list" style="width: 100%" v-loading.lock="listLoading" element-loading-text="同步中">

        <el-table-column prop="ID" label="国标编码" min-width="120px">
        </el-table-column>
        <el-table-column prop="Name" label="国标名称">
        </el-table-column>
        <el-table-column prop="Cascade" label="级联类型" :formatter="formatCascade">
        </el-table-column>
        <el-table-column prop="RegDevType" label="注册设备类型" :formatter="formatRegDevType">
        </el-table-column>
        <el-table-column prop="Domain" label="域名">
        </el-table-column>
        <el-table-column prop="IP" label="地址">
        </el-table-column>
        <el-table-column prop="ExpireAt" label="剩余时长(秒)">
        </el-table-column>
        <el-table-column prop="Status" label="状态" :filters="StatusFilters" :formatter="formatStatus" :filter-method="filterStatus">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template scope="scope">
            <el-button-group>
              <el-tooltip content="同步平台" placement="top">
                <el-button size="small" icon="cw-shuaxin"  @click="handleSync('platform',scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="同步设备" placement="top">
                <el-button size="small" icon="cw-shuaxin1" @click="handleSync('device',scope.$index, scope.row)" ></el-button>
              </el-tooltip>
              <el-tooltip content="编辑平台" placement="top">
                <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除平台" placement="top">
                <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <MyEditor v-if="status==2" @success="onSuccess" :data="currentData" :title="title" :btnName='btnName'></MyEditor>

    <div class="footer">
      <el-button type="primary" icon="edit" @click="onNew" v-if="status==1">新建</el-button>
    </div>

  </div>
</template>

<script>
import { GetGbPlatform, RemoveGbPlatform, SyncGBPlatform } from '@/api/gbplatform'

import MyEditor from './edit'
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      list: null,
      listLoading: true,
      show: false,
      status: 1,
      currentData: {
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: ''
      },
      title: '新建平台',
      dialogVisible: false,
      StatusFilters: [{ text: '离线', value: 0 }, { text: '在线', value: 1 }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true

      GetGbPlatform(this.org).then(response => {
        console.log(response.data)
        this.list = response.data
        this.listLoading = false
      })
    },
    syncPlatform(id) {
      this.listLoading = true
      SyncGBPlatform(id).then(response => {
        this.$message({
          type: 'info',
          message: '同步成功',
          duration: 1000
        })
        this.listLoading = false
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '同步失败',
          duration: 1000
        })
        this.listLoading = false
      })
    },
    handleSync(type, index, row) {
      if (type === 'platform') {
          console.log('sync platform id=' + row.ID)
          this.syncPlatform(row.ID)
      } else if (type === 'device') {

      }
    },
    filterStatus(value, row) {
      return (row.status === value)
      // console.log(value, row)
    },
    formatCascade(row, column, cellValue) {
      // console.log(row, column, cellValue)
      if (cellValue === 1) {
        return '下级平台'
      } else if (cellValue === 2) {
        return '上级平台'
      } else if (cellValue === 3) {
        return '其他设备'
      } else if (cellValue === 0) {
        return '本平台'
      }
    },
    formatRegDevType(row, column, cellValue) {
      // console.log(row, column, cellValue)
      if (cellValue === 1) {
        return '设备'
      } else if (cellValue === 2) {
        return '终端'
      } else if (cellValue === 0) {
        return '平台'
      }
    },
    formatStatus(row, column, cellValue) {
      // console.log(row, column, cellValue)
      // 0-离线,其他-在线
      if (cellValue === 0) {
        return '离线'
      } else {
        return '在线'
      }
    },
    handleEdit(index, row) {
      // 深度拷贝row对象，否则在子组件中会修改到row的内容.
      this.currentData = Object.assign({}, row)
      this.status = 2
      this.title = '编辑平台'
      this.btnName = '立即修改'
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        RemoveGbPlatform(row).then(response => {
          if(response.data.success==true)
          {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.fetchData()
            console.log(response.data)
          } else {
            this.$message({
              type: 'error',
              message: response.data.message,
              duration: 1000
            })
          }
     
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })

      console.log(index, row)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    onSubmit() {
      console.log('submit!')
      this.status = 1
    },
    onSuccess(refresh) {
      if (refresh === true) {
        this.fetchData()
      }

      console.log('onSuccess!')
      this.status = 1
    },
    onNew() {
      this.status = 2
      this.currentData = {
        RegDevType: '',
        Cascade: ''

      }
      this.title = '新建平台'
      this.btnName = '立即创建'
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>

<style>
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}

.el-card__header {
  padding: 1px 2px
}

.tree {
  height: 1000px;
}
</style>
