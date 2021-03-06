let users=[];

const addUser=( {id,name,room})=>{
    console.log(name)
    name=name.trim().toLowerCase()
    room=room.trim().toLowerCase()
    const existing=users.find(user=>user.name===name&&user.room===room)
    if(existing){
        return {error:'user already exists'}
    }
    const user={id,name,room}
    users.push(user)
    return {user}
}

const removeUser=(id)=>{
    const index=users.findIndex(user=>user.id==id)
    if(index!=-1){
        return users.splice(index,1)[0]
    }
}

// const getUser=(id)=> users

const getUser=(id)=> users.find(user=>user.id==id)

const getUsersInRoom=(room)=>users.filter(user=>user.room===room)

module.exports={addUser,removeUser,getUser,getUsersInRoom}