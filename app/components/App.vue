<template>
    <Page @loaded="loaded">
        <ActionBar backgroundColor="#8B0000">
          <StackLayout ios:horizontalAlignment="center"
    android:horizontalAlignment="left" orientation="horizontal">
          <Image src="res://icon" width="40" height="40"></Image>
          <android><SearchBar hint="Busque personagem" v-model ="name" @submit="onTextChanged" />
          </android>
          </StackLayout>
        </ActionBar>

        <GridLayout columns="*" rows="*">
        <ios>
            <SearchBar hint="Busque personagem" v-model ="name" @submit="onTextChanged" />
          </ios>
        
            <ListView separatorColor="transparent" v-show="loading==false" layout="grid" ref="listView"  for="item in characters" @itemTap="itemTap($event)" >
              <v-template >
                <!-- Shows the list item label in the default color and style. -->
                <StackLayout class="boxMarvel" orientation="horizontal">
                  <Image :src="item.thumbnail.path+'.'+item.thumbnail.extension" stretch="aspectFit" height="50" width="50" class="circle"/>
                <Label :text="item.name" class="message" fontSize="25" textWeight="bold" />
                </StackLayout>
                 </v-template>
            </ListView>
            <Label text="Carregando... Aguarde...." v-show="loading"></Label>
        </GridLayout>
    </Page>
</template>
<script >
import * as app from 'tns-core-modules/application'
import * as platform from 'tns-core-modules/platform'
import * as color from 'tns-core-modules/color'
import * as http from 'tns-core-modules/http'
import Heros from '@/components/heros/Heros'
import md5 from 'md5';
  export default {
    data() {
      return {
        characters:[],
        name: '',
        loading: true, 
      }
    },
    async created (){
      let ts=Math.floor((new Date()).getTime()/1000)
      alert('Vamos buscar os dados');
      http.getJSON('https://gateway.marvel.com/v1/public/characters?apikey=027975859a3e06d3e4124a9ede0954ac&ts='+ts+'&hash='+md5(ts+'0d51481b1d7be3b3da3384f196a183b7ac064b50'+'027975859a3e06d3e4124a9ede0954ac')).then((data)=>{
        this.characters= data.data.results
        this.loading=false
      })
    },
    methods: {
      itemTap (event) {
        this.$navigateTo(Heros,{props:{character:event.item}});
      },
      async onTextChanged(){
        this.loading=true
         let ts=Math.floor((new Date()).getTime()/1000)
         http.getJSON('https://gateway.marvel.com/v1/public/characters?apikey=027975859a3e06d3e4124a9ede0954ac&ts='+ts+'&hash='+md5(ts+'0d51481b1d7be3b3da3384f196a183b7ac064b50'+'027975859a3e06d3e4124a9ede0954ac')+'&nameStartsWith='+this.name).then((data)=>{
           this.characters=data.data.results
           this.loading=false
         })
      },
      loaded (){
          if(app.android && platform.device.sdkVersion>='21'){
            var window= app.android.foregroundActivity.getWindow();
            window.setStatusBarColor(new color.Color('#8B0000').android)
            window.setNavigationBarColor(new color.Color('#8B0000').android)
          }
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #8B0000;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
    .circle{
      border:1px solid darkred;
      border-radius:70px;
      margin-right:5px;
    }
</style>
