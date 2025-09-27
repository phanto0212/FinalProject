import React, { useEffect } from 'react'
import RecipeDetailComponent from '../../components/RecipeDetailComponent/RecipeDetailComponent'
import CommentComponent from '../../components/CommentComponent/CommentComponent'
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/request';

function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.recipeId; // Lấy ID từ URL nếu cần thiết
  const [recipeData, setRecipeData] = React.useState(null);
  const getRecipeData = async (recipeId) => {
    const response = await newRequest.get(`/api/recipes/get/recipe/${recipeId}`);
    console.log(response.data,'recipe data', recipeId); // Kiểm tra dữ liệu nhận được
    if(response.status === 200){
       setRecipeData(response.data.recipe || null);
    }
  };
  useEffect(()=>{
    getRecipeData(recipeId);
  }, [recipeId])
  return (
    <>
      <RecipeDetailComponent recipeId={recipeId} recipeData={recipeData}/>
      <CommentComponent />
    </>
  )
}

export default RecipeDetailPage