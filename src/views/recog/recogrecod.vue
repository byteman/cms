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
          <img class="avatar" @click="specialClick(scope.row,1)" :src="scope.row.top1" />
        </template>
      </el-table-column>

      <el-table-column prop="top2" label="TOP2" width="150">
        <template slot-scope="scope">
          <img class="avatar" @click="specialClick(scope.row,2)" :src="scope.row.top2" />
        </template>
      </el-table-column>

      <el-table-column prop="top3" label="TOP3" width="150">
        <template slot-scope="scope">
          <img class="avatar" @click="specialClick(scope.row,3)" :src="scope.row.top3" />
        </template>
      </el-table-column>

      <el-table-column prop="top4" label="TOP4" width="150">
        <template slot-scope="scope">
          <img class="avatar" @click="specialClick(scope.row,4)" :src="scope.row.top4" />
        </template>
      </el-table-column>

      <el-table-column prop="top5" label="TOP5" width="150">
        <template slot-scope="scope">
          <img class="avatar" @click="specialClick(scope.row,5)" :src="scope.row.top5" />
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
      title="查看"
      :visible.sync="show"
      width="500px"
      center>
      <div class="show-dilog">
       <img class="show-dilog-avatar" :src="show_reg_src" />
        <p class="show-dilog-score">{{ this.show_score }}</p>
        <ul class="buttion-ul">
          <li class="button-li1"><el-button  icon="el-icon-edit" @click="specialcontroll(1,0x12030)"></el-button></li>
          <li class="button-li2"><el-button  icon="el-icon-edit" @click="specialcontroll(2,0x12030)"></el-button></li>
          <li class="button-li3"><el-button  icon="el-icon-edit" @click="specialcontroll(3,0x12030)"></el-button></li>
          <li class="button-li4"><el-button  icon="el-icon-edit" @click="specialcontroll(1,0x12017)"></el-button></li>
          <li class="button-li5"><el-button  icon="el-icon-edit" @click="specialcontroll(2,0x12017)"></el-button></li>
          <li class="button-li6"><el-button  icon="el-icon-edit" @click="specialcontroll(3,0x12017)"></el-button></li>
          <li class="button-li7"><el-button  icon="el-icon-edit" @click="specialcontroll(1,0x12014)"></el-button></li>
        </ul>
        <div class="clearfix"></div>
      </div>
    </el-dialog>

    <el-dialog
      :title="title"
      :visible.sync="showChannel"
      width="1200px"
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
              <img class="more-dialog-right-src" v-bind:src="value.regFaceData" @click="moreSpecial(value)"/>
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
import { Page, List, Special } from "@/api/recogrecod";

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
      show: false,
      show_live_id: "",
      show_channel_id: "",
      show_reg_id: "",
      show_reg_src: "",
      show_score: "",
      title: "识别详情",
      showChannel: false,
      selectedSrc: "",
      selectedchannel_id: "",
      selectedlive_id: "",
      selected: [],
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
      this.param.size = val;
      this.getResult();
    },
    handleCurrentChange(val) {
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
      this.getResult();
    },
    moreSpecial(value) {
  
      this.show = value.flg;
      this.show_reg_src = value.regFaceData;
      this.show_live_id = this.selectedlive_id;
      this.show_reg_id = value.registerId;
      this.show_score = value.topScore;
      this.show_channel_id = this.selectedchannel_id;
    },
    specialcontroll(iflag, bcode) {
      Special(
        iflag,
        bcode,
        this.show_channel_id,
        this.show_live_id,
        this.show_reg_id
      ).then(resp => {
        if (resp.data.status + "" === "0") {
          alert("操作成功");
        } else {
          alert("操作失败");
        }
      });
    },
    specialClick(row, index) {
      this.show = true;
      switch (index + "") {
        case "1":
          this.show_reg_src = row.top1;
          this.show_live_id = row.live_id;
          this.show_reg_id = row.top1id;
          this.show_score = row.top1Score;
          this.show_channel_id = row.channel_id;
          break;
        case "2":
          this.show_reg_src = row.top2;
          this.show_live_id = row.live_id;
          this.show_reg_id = row.top2id;
          this.show_score = row.top2Score;
          this.show_channel_id = row.channel_id;
          break;
        case "3":
          this.show_reg_src = row.top3;
          this.show_live_id = row.live_id;
          this.show_reg_id = row.top3id;
          this.show_score = row.top3Score;
          this.show_channel_id = row.channel_id;
          break;
        case "4":
          this.show_reg_src = row.top4;
          this.show_live_id = row.live_id;
          this.show_reg_id = row.top4id;
          this.show_score = row.top4Score;
          this.show_channel_id = row.channel_id;
          break;
        case "5":
          this.show_reg_src = row.top5;
          this.show_live_id = row.live_id;
          this.show_reg_id = row.top5id;
          this.show_score = row.top5Score;
          this.show_channel_id = row.channel_id;
          break;
      }
    },
    more(row) {
      this.showChannel = true;
      List(row.channel_id, row.live_id, row.timeStamp0).then(resp => {
        var resultObj = eval("(" + resp.data.data.results + ")");
        console.log(resultObj);
        this.selected = resultObj.recogArray;
        for (var i = 0; i < this.selected.length; i++) {
          if (this.selected[i].regFaceData === "") {
            this.selected[i].regFaceData =
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACmCAIAAACp0NGrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNGMzUyMTlFRTUzMDExRTc4OUM5ODhDNUU4Q0JEODc3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNGMzUyMTlGRTUzMDExRTc4OUM5ODhDNUU4Q0JEODc3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0YzNTIxOUNFNTMwMTFFNzg5Qzk4OEM1RThDQkQ4NzciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0YzNTIxOURFNTMwMTFFNzg5Qzk4OEM1RThDQkQ4NzciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz76uMojAAAG9UlEQVR42uyd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";
            this.selected[i].sex = "未知";
            this.selected[i].age = "未知";
            this.selected[i].flg = false;
            continue;
          }
          this.selected[i].flg = true;
          this.selected[i].regFaceData =
            "data:image/jpeg;base64," + this.selected[i].regFaceData;
          if (this.selected[i].sex === "1") {
            this.selected[i].sex = "男";
          } else if (this.selected[i].sex === "2") {
            this.selected[i].sex = "女";
          } else {
            this.selected[i].sex = "未知";
          }
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
          item.top1id = resultObj.liveArray[i].recogArray[0].registerId;
          if (resultObj.liveArray[i].recogArray[1]) {
            item.top2 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[1].regFaceData;
            item.top2id = resultObj.liveArray[i].recogArray[1].registerId;
            item.top2Score = resultObj.liveArray[i].recogArray[1].topScore;
          }
          if (resultObj.liveArray[i].recogArray[2]) {
            item.top3 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[2].regFaceData;
            item.top3id = resultObj.liveArray[i].recogArray[2].registerId;
            item.top3Score = resultObj.liveArray[i].recogArray[2].topScore;
          }
          if (resultObj.liveArray[i].recogArray[3]) {
            item.top4 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[3].regFaceData;
            item.top4id = resultObj.liveArray[i].recogArray[3].registerId;
            item.top4Score = resultObj.liveArray[i].recogArray[3].topScore;
          }
          if (resultObj.liveArray[i].recogArray[4]) {
            item.top5 =
              "data:image/jpeg;base64," +
              resultObj.liveArray[i].recogArray[4].regFaceData;
            item.top5id = resultObj.liveArray[i].recogArray[4].registerId;
            item.top5Score = resultObj.liveArray[i].recogArray[4].topScore;
          }
          this.param.list.push(item);
        }
        this.param.loading = false;
        console.log(this.param.list);
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
.show-dilog-avatar {
  margin-left: 40px;
  width: 85%;
}
.show-dilog-score {
  margin-left: 197px;
}
.button-li1 {
  float: left;
}
.button-li2 {
  float: left;
}
.button-li3 {
  float: left;
}
.button-li4 {
  float: left;
}
.button-li5 {
  float: left;
}
.button-li6 {
  float: left;
}
.button-li7 {
  float: left;
}
.buttion-ul {
  list-style: none;
  margin-left: -6px;
}
.clearfix {
  clear: both;
}
</style>