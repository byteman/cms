<template>
  <div class="container">
    <div class="header">
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
    </div>
  
    <div class="content">
       <el-form :inline="true" class="button-oper">      
        <el-form-item>
        <el-button plain @click="onAdd">新增</el-button>
        </el-form-item>
          <el-form-item>
        <el-button plain @click="onRemove">批量删除</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list" >

    <el-table-column type="selection"width="55">
    </el-table-column>

    <el-table-column prop="id" label="组ID">
    </el-table-column>
    <el-table-column prop="name" label="组名称">
    </el-table-column>
    <el-table-column prop="createtime" label="创建时间" >
    </el-table-column>
    <el-table-column prop="group_type" label="组类型" >
    </el-table-column>

          <el-table-column label="操作" width="300" align='center'>
          <template slot-scope="scope">

          <el-button type="text" size="small">详情</el-button>
            <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small">添加</el-button>
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
 

  </div>
</template>

<script>
import { GetVideoDebug } from "@/api/sysconfig";
export default {
  data() {
    return {
      total:50,
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
  mounted() {},
  methods: {
    onSubmit: function() {},
    onReset: function() {},
    onAdd: function() {},
    onRemove: function() {},
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange:function(){},
    handleCurrentChange:function(){}
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
