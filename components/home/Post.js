import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from '../../firebase';

const handleLike = post =>{
   
    const currentLikeStatus = !post?.likes_by_users?.includes(
        firebase.auth().currentUser.email
    )

    firebase.firestore().collection('users')
    .doc( post.owner_email )
    .collection('posts')
    .doc(post.id)
    .update({
        likes_by_users: currentLikeStatus 
                        ? firebase.firestore.FieldValue.arrayUnion( firebase.auth().currentUser.email) 
                        : firebase.firestore.FieldValue.arrayRemove( firebase.auth().currentUser.email) 
    }).catch(err=>console.log(err))   
}

export default function Post({post, navigation}) {
    
    return (
        <View style={{marginBottom:10}}>
           <Divider width={1} orientation='vertical' />
           <PostHeader post={post} />
           <PostImage post={post} />
           <View style={{marginHorizontal:10, marginTop:30}}>
           <PostFooter post={post} />
           <Likes post={post} navigation={navigation} />
           <Caption post={post} />
           <CommentSection post={post} />
           <Comments post={post} />
           </View>
        </View>
    )
}


const PostHeader = ({post}) =>{
    return (
    <View style={{ 
        flexDirection:'row', 
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'
        }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
            source={{
                uri:post.profile_picture
            }}
            style={styles.story} />
            <Text style={{color:'white',fontWeight:'800',marginLeft:5}}>
                {post.user}
            </Text>
        </View>
        <View>
            <Text style={{color:'white', fontWeight:'900'}}>...</Text>
        </View>
    </View>
    )
}

const PostImage = ({post}) =>(
    <View style={{width:'100%', height:400}}>
     <Image source={{uri: post.imageUrl}} style={{ height:'100%', resizeMode:'cover' }} />
     </View>
)

const FooterIcons = [
    {
        name:'Like',
        imageUrl:'https://img.icons8.com/ios/50/ffffff/like.png',
        likedImageUrl:'https://img.icons8.com/ios-filled/50/fa314a/like.png'
    },
    {
        name:'Comment',
        imageUrl:'https://img.icons8.com/ios-glyphs/50/ffffff/speech.png'
    },
    {
        name:'Share',
        imageUrl:'https://img.icons8.com/ios/50/ffffff/forward-arrow.png'
    },
    {
        name:'Save',
        imageUrl:'https://img.icons8.com/ios/50/ffffff/bookmark-ribbon.png'
    }
]

const PostFooter = ({post}) =>(
    <View style={{flexDirection:'row'}}>
        <View style={styles.leftFooterIconCOntainer}>
            <TouchableOpacity onPress={()=>handleLike(post)}>
                <Image 
                    style={styles.FooterIcons} 
                    source={{ uri: !post?.likes_by_users
                                        .includes(firebase.auth().currentUser.email) ? FooterIcons[0].imageUrl : FooterIcons[0].likedImageUrl}} />
            </TouchableOpacity>
            <Icon imgStyle={styles.FooterIcons} imgUrl={FooterIcons[1].imageUrl} />
            <Icon imgStyle={[styles.FooterIcons, styles.shareIcon]} imgUrl={FooterIcons[2].imageUrl} />
        </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
        <Icon imgStyle={styles.FooterIcons} imgUrl={FooterIcons[3].imageUrl} />
        </View>
    </View>
)

const Icon =({imgStyle, imgUrl})=>(
    <TouchableOpacity>
        <Image source={{uri:imgUrl}} style={imgStyle} />
    </TouchableOpacity>
)

const Likes = ({post, navigation}) =>(
    <TouchableOpacity onPress={()=>{
        navigation.push('LikesScreen',post)
    }}>
        <Text style={{color:'white', fontWeight:"bold"}}>
           { post.likes_by_users?.length > 1 ? "Liked by "+post.likes_by_users[0]+" and "+ Number(post.likes_by_users?.length-1) + " others": new String(post.likes_by_users?.length || 0).toLocaleString('en') + " Likes" }
        </Text>
    </TouchableOpacity>
)


const Caption = ({post}) =>(
    <Text style={{color:'white', marginVertical:2}}>
        <Text style={{fontWeight:'bold'}}>{post.user}</Text>
        <Text style={{marginLeft:'10', color:'#a9b0ba'}}> {' '}{post.caption}</Text>
    </Text>
)

const CommentSection = ({post}) =>(
    <View style={{marginTop:10}}>
        { !!post?.comments?.length && 
        <Text style={{color:'grey'}}>
         View {post?.comments?.length > 1 ? 'all':''} {post?.comments.length}{' '}
         {post?.comments?.length > 1 ? 'comments':'comment'}
         </Text> 
        }
    </View>
)

const Comments = ({post}) =>(
    <>
    { post?.comments?.map((comment,index)=>{
        return <View key={index} style={{flexDirection:'row',marginTop:5 }}>
            <Text style={{color:'white'}}>
            <Text style={{fontWeight:'bold'}}>{comment.user} </Text>
            <Text>{comment.comment} </Text>
            </Text>
        </View>
    }) }
    </>

)



const styles = StyleSheet.create({
    story:{
        width:40,
        height:40,
        borderRadius:50,
        borderWidth:1,
        marginLeft:15,
        borderColor:'green'
    },
    storyWrapper:{
        marginVertical:10,
    },
    FooterIcons:{
        width:20,
        height:20,
        padding:0,
        marginBottom:8
    },
    leftFooterIconCOntainer:{
        flexDirection:'row',
        width:'30%',
        justifyContent:'space-between'
    },
    shareIcon:{
        transform:[{rotate:'320deg'}],
        marginTop:-3,
    }
})