<template>
  <div class="container">
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="底库选择">
          <el-input v-model="formInline.name" placeholder="请选择底库"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">底库设定</el-button>
        </el-form-item>

        <el-form-item>
          <el-button plain @click="onAdd">新增人脸</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="onRemove">批量导入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">

      <el-table :data="list">

        <el-table-column type="selection" width="55">
        </el-table-column>

        <el-table-column prop="id" label="姓名"></el-table-column>
        <el-table-column prop="name" label="头像"></el-table-column>
        <el-table-column prop="createtime" label="性别"></el-table-column>
        <el-table-column prop="group_type" label="生日"></el-table-column>
        <el-table-column prop="group_type" label="所在底库"></el-table-column>

        <el-table-column label="操作" width="300" align='center'>
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="footer">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {GetVideoDebug} from "@/api/sysconfig";

  export default {
    data() {
      return {
        total: 50,
        currentPage: 1,
        list: [
          {
            id: "0001",
            name: "公司门口",
            createtime: "2017-11-23",
            group_type: "白名单"
          },
          {
            id: "0001",
            name: "公司门口",
            createtime: "2017-11-23",
            group_type: "白名单"
          },
          {
            id: "0001",
            name: "公司门口",
            createtime: "2017-11-23",
            group_type: "白名单"
          },
          {
            id: "0001",
            name: "公司门口",
            createtime: "2017-11-23",
            group_type: "白名单"
          },
          {
            id: "0001",
            name: "公司门口",
            createtime: "2017-11-23",
            group_type: "白名单"
          }
        ],
        formInline: {
          name: ""
        }
      };
    },
    created() {
      console.log("video debug  created");
    },
    mounted() {
    },
    methods: {
      onSubmit: function () {
      },
      onReset: function () {
      },
      onAdd: function () {
      },
      onRemove: function () {
      },
      handleClick(row) {
        console.log(row);
      },
      handleSizeChange: function () {
      },
      handleCurrentChange: function () {
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
