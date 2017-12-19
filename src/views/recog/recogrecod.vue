<template>
  
    <div class="container">
    <div class="header">
    <el-form :inline="true" :model="param" :rules="rules" ref="myform">
      <el-form-item label="抓拍时间">
        <div class="block">
          <el-date-picker
            v-model="param.datetime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="抓拍ID">
        <el-input v-model="param.live_id" ></el-input>
      </el-form-item>

      <el-form-item label="通道ID">
        <el-input v-model="param.channel_id" ></el-input>
      </el-form-item>

      <el-form-item label="对比分过滤" prop="top1_scoreMin">
        <el-input  v-model="param.top1_scoreMin" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onRest">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
    <div class="content">
    <el-table :data="param.list" v-loading="param.loading" element-loading-text="加载中,请等待">
      <el-table-column type="selection" width="50">
      </el-table-column>

      <el-table-column prop="live_id" label="抓拍ID" width="100">
      </el-table-column>

      <el-table-column prop="channel_id" label="通道ID" width="100">
      </el-table-column>

      <el-table-column prop="liveFaceData" label="抓拍图" width="150">
         <template slot-scope="scope">
          <img class="avatar" :src="scope.row.liveFaceData" />
        </template>
      </el-table-column>

      <el-table-column prop="timeStamp" label="抓拍时间" width="200">
      </el-table-column>

      <el-table-column prop="similar_live_id" label="相似ID" width="100">
      </el-table-column>

      <el-table-column prop="top1Score" label="TOP1对比分" width="100">
      </el-table-column>

      <el-table-column prop="top1" label="TOP1" width="150">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top1" />
        </template>
      </el-table-column>

      <el-table-column prop="top2" label="TOP2" width="150">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top2" />
        </template>
      </el-table-column>

      <el-table-column prop="top3" label="TOP3" width="150">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top3" />
        </template>
      </el-table-column>

      <el-table-column prop="top4" label="TOP4" width="150">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top4" />
        </template>
      </el-table-column>

      <el-table-column prop="top5" label="TOP5" width="150">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.top5" />
        </template>
      </el-table-column>

        
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="more(scope.row)" >详情</el-button>
        </template>
      </el-table-column>

    </el-table>

    </div>
      <div class="footer">
        <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 15, 20]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="param.total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="showChannel"
      width="1300px"
      center>
      <div class="more-dialog">
        <div class="more-dialog-left">
          <img class="more-dialog-left-src" v-bind:src="this.selectedSrc"/>
          <p class="more-dialog-left-channel">channel:{{ this.selectedchannel_id }}</p>
          <p class="more-dialog-left-live">live_id:{{ this.selectedlive_id }}</p>
        </div>
        <ul class="more-dialog-right">
          <li class="more-dialog-right-li" v-for="value in this.selected">
            <div>
              <p class="more-dialog-right-li-top">注册ID:{{ value.registerId }}</p>
              <img class="more-dialog-right-src" v-bind:src="value.regFaceData"/>
              <p class="more-dialog-right-li-bottum">性别:{{ value.sex }} 年龄:{{ value.age }}</p>
            </div>                
          </li>
        </ul>
      <div class="clearfix"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Page, List } from "@/api/recogrecod";

export default {
  data() {
    var threshold_validator = (rule, value, callback) => {
      var re = /^\d+(\.\d+)?$/;
      if (!re.test(value)) {
        callback(new Error("该值必须在0-1之间的数字"));
      } else if (value < 0 || value > 1) {
        callback(new Error("该值必须在0-1之间的数字"));
      } else {
        callback();
      }
    };

    return {
      title: "识别详情",
      showChannel: false,
      selectedSrc: "",
      selectedchannel_id: "",
      selectedlive_id: "",
      selected: {
        liveFaceData: "",
        live_id: "123",
        channel_id: "123",
        recodArray: []
      },
      param: {
        loading: false,
        total: 100,
        currrent: 1,
        size: 10,
        datetime: [],
        live_id: "",
        channel_id: "",
        top1_scoreMin: "",
        list: []
      },
      rules: {
        top1_scoreMin: [{ validator: threshold_validator, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.param.size = val;
      this.getResult();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.param.currrent = val;
      this.getResult();
    },
    onSubmit() {
      this.param.currrent = 1;
      this.getResult();
    },
    onRest() {
      this.param = {
        total: 0,
        currrent: 1,
        size: 10,
        datetime: [],
        live_id: "",
        channel_id: "",
        top1_scoreMin: "",
        list: []
      };
      this.$refs.myform.resetFields();
      this.getResult();
    },
    more(row) {
      this.showChannel = true;
      List(row.channel_id, row.live_id, row.timeStamp0).then(resp => {
        var resultObj = eval("(" + resp.data.data.results + ")");
        this.selected = resultObj.recogArray;
        for (var i = 0; i < this.selected.length; i++) {
          this.selected[i].regFaceData =
            "data:image/jpeg;base64," + this.selected[i].regFaceData;
          if (this.selected[i].sex === "1") {
            this.selected[i].sex = "男";
          } else if (this.selected[i].sex === "2") {
            this.selected[i].sex = "女";
          } else {
            this.selected[i].sex = "未知";
          }
          console.log(this.selected[i].age);
          if (this.selected[i].age === 0) {
            this.selected[i].age = "未知";
          } else {
            this.selected[i].age = this.selected[i].age + "岁";
          }
        }
      });
      this.selectedSrc = row.liveFaceData;
      this.selectedlive_id = row.live_id;
      this.selectedchannel_id = row.channel_id;
    },
    getResult() {
      this.param.loading = true;
      if (this.param.datetime[0]) {
        var start = this.param.datetime[0].getTime();
      }
      if (this.param.datetime[1]) {
        var end = this.param.datetime[1].getTime();
      }
      Page(
        this.param.currrent,
        this.param.size,
        this.param.channel_id,
        this.param.live_id,
        this.param.top1_scoreMin,
        start,
        end
      ).then(resp => {
        var result = resp.data.data.results;
        var resultObj = eval("(" + result + ")");
        this.param.total = resultObj.total;
        this.param.list = [];
        for (var i = 0; i < resultObj.liveArray.length; i++) {
          var item = new Object();
          item.live_id = resultObj.liveArray[i].live_id;
          item.channel_id = resultObj.liveArray[i].channel_id;
          var timestamp = resultObj.liveArray[i].timeStamp;
          item.timeStamp = new Date(timestamp).toLocaleString();
          item.timeStamp0 = timestamp;
          item.liveFaceData =
            "data:image/jpeg;base64," + resultObj.liveArray[i].liveFaceData;
          item.similar_live_id = resultObj.liveArray[i].similar_live_id;
          item.top1Score = resultObj.liveArray[i].recogArray[0].topScore;
          item.top1 =
            "data:image/jpeg;base64," +
            resultObj.liveArray[i].recogArray[0].regFaceData;
          if (resultObj.liveArray[i].recogArray[1]) {
            item.top2 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[1].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[2]) {
            item.top3 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[2].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[3]) {
            item.top4 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[3].regFaceData;
          }
          if (resultObj.liveArray[i].recogArray[4]) {
            item.top5 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[4].regFaceData;
          }
          this.param.list.push(item);
        }
        this.param.loading = false;
      });
    }
  },
  mounted() {
    this.getResult();
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
.content {
  width: 97%;
  margin: 0 auto;
}
.avatar {
  width: 80%;
}
.header {
  padding: 24px;
  background-color: rgb(248, 249, 248);
  height: 90px;
}
.footer {
  height: 50px;
  margin-top: 10px;
  margin-right: 90px;
  text-align: right;
}
.more-dialog {
  width: auto;
  height: auto;
  margin: 0 auto;
}
.more-dialog-left {
  width: 15%;
  height: 100%;
  float: left;
}
.more-dialog-left-src {
  margin-left: 45px;
  width: 60%;
  margin-top: 67px;
}
.more-dialog-left-channel {
  margin-left: 45px;
  width: 60%;
}
.more-dialog-left-live {
  margin-left: 45px;
  width: 60%;
}
.more-dialog-right {
  width: 85%;
  list-style: none;
  float: left;
}
.more-dialog-right-li {
  float: left;
  margin-left: 10px;
}
.clearfix {
  clear: both;
}
.more-dialog-right-li-top {
  margin-left: 43px;
}
.more-dialog-right-li-bottum {
  margin-left: 22px;
}
</style>