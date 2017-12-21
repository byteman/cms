<template>
  <div class="container">
    <!-- <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="查询条件">
          <el-input v-model="formInline.name" placeholder="请输入底库名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <div class="content">
      <el-form :inline="true" class="button-oper">
        <el-form-item>
          <el-button type="primary"  @click="onAdd">新增</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button plain @click="onRemove">批量删除</el-button>
        </el-form-item> -->
      </el-form>
      <el-table :data="list">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="id" label="组ID">
        </el-table-column>
        <el-table-column prop="group_name" label="底库名称">
        </el-table-column>
        <el-table-column prop="group_threshold" label="识别阈值">
        </el-table-column>
        <el-table-column prop="group_describe" label="底库描述">
        </el-table-column>

        <el-table-column label="操作" width="300" align='center'>
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button @click="handleRemove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="footer">
        <div class="block">
          <el-pagination layout="prev, pager, next" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog :title="group_dialog_title" :visible.sync="group_show" width="30%" center>
      <el-form ref="form" :model="group" label-width="100px">
        <el-form-item label="组ID">
          <el-input :disabled="isEdited" v-model="group.group_id"></el-input>
        </el-form-item>
        <el-form-item label="底库名称">
          <el-input v-model="group.group_name"></el-input>
        </el-form-item>
        <el-form-item label="识别阈值">
          <el-input v-model="group.group_threshold"></el-input>
        </el-form-item>
        <el-form-item label="底库描述">
          <el-input v-model="group.group_describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="group_show = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveFaceDB">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {GetGroup, CommPost, RemoveGroup} from '@/api/sysconfig'

  export default {
    data() {
      return {
        total: 1,
        group_dialog_title: '相机详情',
        group_show: false,
        group: {},
        list: [],
        isEdited: false,
        formInline: {
          name: ''
        }
      }
    },
    created() {
      console.log('video debug created')
    },
    mounted() {
      this.onRefresh()
    },
    methods: {
      onRefresh() {
        GetGroup(80001)
          .then(response => {
            this.list = response.data.data.group_ids
            console.log(this.list)
          })
          .catch(() => {
          })
      },
      onSubmit: function() {
      },
      onReset: function() {
      },
      onAdd: function() {
        this.isEdited = false
        this.group_dialog_title = '新增底库'
        this.group_show = true
        this.group = {}
      },
      onRemove: function() {
      },
      handleEdit(row) {
        console.log(row)
        this.isEdited = true
        this.group = row
        this.group.group_id = row.id
        this.group_show = true
      },
      handleRemove(row) {
        this.$confirm('确认删除该底库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          RemoveGroup(row.id)
            .then(response => {
              this.onRefresh()
            })
            .catch(() => {
            })
        })
      },
      handleSizeChange: function() {
      },
      handleCurrentChange: function() {
      },
      handleSaveFaceDB() {
        var data = {
          requestdata: {
            token: 1,
            bcode: '80000',
            group_id: this.group.group_id,
            data: this.group
          }
        }
        CommPost(data)
          .then(response => {
            this.group_show = false
            this.onRefresh()
        })
        .catch(() => {
          this.$message('保存失败')
        })
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

  .button-oper {
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
</style>
