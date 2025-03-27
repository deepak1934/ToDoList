import React from 'react'
import "./home.css";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
        <div className="container  d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">Orgainze your  <br /> work and life, finally</h1>
            <p>
                Become focused , Orgainze, and calm with <br />
                todo app. The world's #1 task manager app.
            </p>
            <button className="home-btn p-2">Make Todo List</button>
        </div>
    </div>
  )
}

export default Home;