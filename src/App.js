
import './App.css';
import  Axios  from 'axios';
import { useState } from 'react';
import RecipeTile from './RecipeTile';
function App() {
  const [query, setquery]=useState("");
  
  const [recipes, setrecipes]=useState([]);

  const [healthlabel, sethealthlabel]=useState("vegan");

  const YOUR_APP_ID= "7e9e3a8d";
const YOUR_APP_KEY="4389a26302c18b3ea3a3087b16909d1f";
  var url=`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthlabel}`;

async function getRecipies(){
  var result=await Axios.get(url);
  setrecipes(result.data.hits);
  console.log(result.data);
}

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipies();
  };

  return (
    <div className="app">
      <h1>FOOD RECIPE BOOK 📃</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input 
          type="text" 
          className="app__input"
          placeholder="Enter Ingredient" 
          value={query} 
          onChange={(e)=>setquery(e.target.value)}>
        </input>
        <select className="app__healthlabels">
        <option onClick={()=>sethealthlabel("Not selected")}>Not Selected</option>
          <option onClick={()=>sethealthlabel("Vegan")}>Vegan</option>
          <option value="vegetarian" onClick={()=>sethealthlabel("Vegetarian")}>Vegetarian</option>
          <option value="dairy-free" onClick={()=>sethealthlabel("dairy-free")}>Dairy-free</option>
          <option value="gluten-free" onClick={()=>sethealthlabel("gluten-free")}>gluten-free</option>
          <option value="wheat-free" onClick={()=>sethealthlabel("wheat-free")}>wheat-free</option>
          <option value="low-sugar" onClick={()=>sethealthlabel("low-sugar")}>low-sugar</option>
          <option value="egg-free" onClick={()=>sethealthlabel("egg-free")}>egg-free</option>
          <option value="peanut-free" onClick={()=>sethealthlabel("peanut-free")}>peanut-free</option>
          <option value="fish-free" onClick={()=>sethealthlabel("fish-free")}>fish-free</option>
        </select>
        <input 
          type="submit" 
          className="app__submit" 
          value="SEARCH">
        </input>
      </form>

      <div className="app__recipes">
        {recipes.map((recipe) => {
          return <RecipeTile recipe={recipe}/>;
        })}
      </div>
    </div>
  );
}

export default App;
