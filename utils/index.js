exports.formatArticleData = (articleData, topicData, userDocs) => {
  return articleData.map(articleInfo => {
    // find the topic that matches  articleInfo.topic with the topic slug
    return {
      ...articleInfo,
      created_by: userDocs.find(
        user => user.username === articleInfo.created_by
      )._id,
      belongs_to: articleInfo.topic
    };
  });
};

exports.formatCommentData = (commentData, userDocs, articleDocs) => {
  return commentData.map(commentInfo => {
    return {
      ...commentInfo,
      created_by: userDocs.find(
        user => user.username === commentInfo.created_by
      )._id,
      belongs_to: articleDocs.find(
        article => article.title === commentInfo.belongs_to
      )._id
    };
  });
};
