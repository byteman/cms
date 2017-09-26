<template>
  <div>
    <div v-if="status==1">

      <el-table :data="list" style="width: 100%">

        <el-table-column prop="gbcode" label="设备编码" min-width="120px">
        </el-table-column>
        <el-table-column prop="name" label="设备名称">
        </el-table-column>
        <el-table-column prop="dev_type" label="设备类型">
        </el-table-column>
        <el-table-column prop="ip_addr" label="设备IP">
        </el-table-column>
        <el-table-column prop="port" label="端口地址">
        </el-table-column>
        <el-table-column prop="rtsp_url" label="RTSP地址" min-width="250px">
        </el-table-column>
        <el-table-column prop="vendor_id" label="厂商" :formatter="formatVendor">
        </el-table-column>
        <el-table-column prop="status" label="状态" :filters="StatusFilters" :formatter="formatStatus" :filter-method="filterStatus">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button-group>

              <el-button size="small" icon="cw-bofang1"></el-button>

              <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>

              <el-button size="small" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)"></el-button>

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
import { getDevices } from '@/api/device'
import { RemoveDevice } from '@/api/device'
import MyEditor from './edit'
export default {
  components: {
    MyEditor
  },
  data() {
    return {
      headers: { 'x-requested-with': '222' },
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
      title: '新建设备',
      dialogVisible: false,
      StatusFilters: [{ text: '离线', value: 0 }, { text: '在线', value: 1 }, { text: '未启动', value: 2 }]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true

      getDevices(this.org).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    filterStatus(value, row) {
      return (row.status === value)
      // console.log(value, row)
    },
    formatVendor(row, column, cellValue) {
      // console.log(row, column, cellValue)
      if (cellValue === 'hik') {
        return '海康'
      } else if (cellValue === 'dahua') {
        return '大华'
      }
    },
    formatStatus(row, column, cellValue) {
      // console.log(row, column, cellValue)
      // 离线 0 在线 1 未启动 2
      if (cellValue === 0) {
        return '离线'
      } else if (cellValue === 1) {
        return '在线'
      } else if (cellValue === 2) {
        return '未启动'
      }
    },
    handleEdit(index, row) {
      // 深度拷贝row对象，否则在子组件中会修改到row的内容.
      this.currentData = Object.assign({}, row)
      this.status = 2
      this.title = '编辑设备'
      this.btnName = '立即修改'
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$confirm('确认删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        RemoveDevice(row).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchData()
          console.log(response.data)
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
        vendor_id: '',
        transmode_id: '',
        conn_proto: '',
        stream_type: '',
        dev_type: ''
      }
      this.title = '新建设备'
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
