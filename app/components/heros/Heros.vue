<template>
    <Page @loaded="loaded">
        <ActionBar flat="true" backgroundColor="#8B0000">
          <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
    
          <StackLayout ios:horizontalAlignment="center" 
    android:horizontalAlignment="left" orientation="horizontal">
          <Image src="res://icon" width="40" height="40"></Image>
        </StackLayout>
        </ActionBar>
        <StackLayout>
          <Image stretch="aspectFit" :src="character.thumbnail.path+'.'+character.thumbnail.extension"></Image>
          <Label class="title" :text="character.name" textWrap="true"></Label>
          <HtmlView class="message" :html="character.description" textWrap="true"></HtmlView>
        </StackLayout>
    </Page>
</template>
<script src="./heros.js"></script>

<style src="./heros.css" scoped>
</style>
