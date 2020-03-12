module.exports = function({commentRepository, profileRepository}){

    return{

        createComment: function(packet, callback){
            const validationErrors = []

            if(packet.activeUser != null){
                profileRepository.getUserByEmail(packet.activeUser, function(error, user){
                    if(error){
                        callback(error)
                    }
                    else{
                        if(packet.content == ""){
                            validationErrors.push("Must enter content")
                        }

                        if(validationErrors == 0){
                            commentRepository.createComment(packet, user[0]._username, function(error){
                                if(error){
                                    callback(error)
                                }
                                else{
                                    callback(null)
                                }
                            })
                        }
                        else{
                            callback(validationErrors)
                        }
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        },

        deleteComment: function(commentId, userEmail, callback){
            const validationErrors = []

            if(userEmail != null){
                commentRepository.getCommentById(commentId, function(error, comment){
                    if(error){
                        callback(error)
                    }
                    else if(comment[0].UserEmail == userEmail){
                        commentRepository.deleteComment(commentId, userEmail, function(error){
                            if(error){
                                callback(error)
                            }
                            else{
                                callback(null, comment[0].ActivityId)
                            }
                        })
                    }
                    else{
                        validationErrors.push("You can not delete others comments")
                        callback(validationErrors)
                    }
                })
            }
            else{
                validationErrors.push("You need to be logged in")
                callback(validationErrors)
            }
        }
    }
}