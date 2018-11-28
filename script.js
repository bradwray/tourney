var MatchUp = {
  template: `<div v-bind:style="'position: absolute;'+'left: ' + matchup.xPos + '%;' + 'top: ' + matchup.yPos + '%;'">
<button v-if="!done" type="button" class="won btn btn-primary btn-xs" v-on:click="topWon()">     {{competitors[(this.matchup.num*2)-2]}}</button>
<button v-else-if="winner.name == competitors[(this.matchup.num*2)-2]" type="button" class="won btn btn-success btn-xs">     {{competitors[(this.matchup.num*2)-2]}}</button>
<button v-else type="button" class="won btn btn-secondary btn-xs"> {{competitors[(this.matchup.num*2)-2]}}</button>
<br>
<button v-if="!done" type="button" class="won btn btn-primary btn-xs" v-on:click="bottomWon()"> {{competitors[(this.matchup.num*2)-1]}}</button>
<button v-else-if="winner.name == competitors[(this.matchup.num*2)-1]" type="button" class="won btn btn-success btn-xs"> {{competitors[(this.matchup.num*2)-1]}}</button>
<button v-else type="button" class="won btn btn-secondary btn-xs" > {{competitors[(this.matchup.num*2)-1]}}</button>
</div>`,
  props: ["competitors", "matchup", "name"],
  methods: {
    topWon: function() {
      if (
        !this.competitors.some(item => {
          return item === "empty seed";
        })
      ) {
        this.winner = {
          name: this.competitors[this.matchup.num * 2 - 2],
          index: this.matchup.num * 2 - 2
        };
        this.done = true;
        this.$emit("winner", this.winner);
      }
    },
    bottomWon: function() {
      if (
        !this.competitors.some(item => {
          return item === "empty seed";
        })
      ) {
        this.winner = {
          name: this.competitors[this.matchup.num * 2 - 1],
          index: this.matchup.num * 2 - 1
        };
        this.done = true;
        this.$emit("winner", this.winner);
      }
    }
  },
  computed: {},
  data: function() {
    return {
      winner: "",
      done: false
    };
  }
};

var app = new Vue({
  el: "#app",
  data: {
    title: "Tournamator",
    seeds: [
      "empty seed",
      "empty seed",
      "empty seed",
      "empty seed",
      "empty seed",
      "empty seed",
      "empty seed",
      "empty seed"
    ],
    matchUps: [
      [
        { num: 1, xPos: 10, yPos: 20 },
        { num: 2, xPos: 10, yPos: 60 },
        { num: 3, xPos: 80, yPos: 20 },
        { num: 4, xPos: 80, yPos: 60 }
      ]
    ],
    newSeed: "",
    vacancy: true,
    numSeeds: ""
  },
  computed: {
    randomlySeed() {
      var tryHere = Math.floor(Math.random() * this.seeds.length);
      while (this.seeds[tryHere] !== "empty seed") {
        tryHere = Math.floor(Math.random() * this.seeds.length);
      }
      this.seeds.splice(tryHere, 1, this.newSeed);

      if (
        !this.seeds.some(item => {
          return item === "empty seed";
        })
      ) {
        this.vacancy = false;
      }
      this.newSeed = "";
    },
    matchUpRound() {
      return this.matchUps[0];
    }
  },
  methods: {
    wins: function(matchUpWinner) {
      console.log(matchUpWinner);
    }
  },
  components: {
    matchup: MatchUp
  }
});

//listens to the value of seeds and runs a function when it changes
app.$watch("numSeeds", function() {});
