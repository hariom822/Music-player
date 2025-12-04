
import { useDispatch, useSelector } from "react-redux";
import { storeMessage } from "./redux/chatSlice";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "./redux/themeSlice";
import { clearHistory, clearFavourites } from "./redux/singerSlice";


const Question = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singers, favourites, history } = useSelector((s) => s.music);
  const user = JSON.parse(localStorage.getItem("user"));

  const processQuestion = (text) => {
    const q = text.toLowerCase();
    let answer = "Sorry, I did not understand that.";

    if (q.includes("who") && q.includes("i")) {
      answer = `You are ${user?.name || "a Guest User"}`;
    } 
    else if (q.includes("my") && q.includes("name")) {
      answer = `Your name is ${user?.name}`;
    } 
    else if (q.includes("my") && q.includes("email")) {
      answer = `Your email is ${user?.email}`;
    }
    else if (q.includes("my") && q.includes("phone")) {
      answer = `Your phone number is ${user?.phone}`;
    }
    else if (q.includes("my") && q.includes("dob")) {
      answer = `Your date of birth is ${user?.dob}`;
    }

    else if (q.includes("new") && q.includes("song")) {
      answer = "Opening New Songs for you...";
      navigate("/newsongs");
    }
    else if (q.includes("odd") && q.includes("song")) {
      answer = "Opening Odd Songs for you...";
      navigate("/oddsong");
    }
    else if (q.includes("favourite") || q.includes("fav")) {
      answer = "Opening your favourite songs...";
      navigate("/favourite");
    }
    else if (q.includes("singer") && q.includes("show")) {
      answer = "Opening singers list...";
      navigate("/singers");
    }
    else if (q.includes("home")) {
      answer = "Taking you to Home Screen!";
      navigate("/");
    }

    else if (q.includes("change theme")) {
      answer = "Changing theme!";
      dispatch(toggleTheme());
    }
    else if (q.includes("dark")) {
      answer = "Switching to dark mode!";
      dispatch(toggleTheme());
    }
    else if (q.includes("light")) {
      answer = "Switching to light mode!";
      dispatch(toggleTheme());
    }
    
    else if (q.includes("clear history")) {
      dispatch(clearHistory());
      answer = "All history has been cleared!";
    }
    else if(q.includes("delete history")){
        dispatch(clearHistory());
      answer = "All history has been cleared!";
    }
     else if(q.includes("remove history")){
        dispatch(clearHistory());
      answer = "All history has been cleared!";
    }
    else if (q.includes("clear favourite")) {
      dispatch(clearFavourites());
      answer = "All favourite songs removed!";
    }
    else if(q.includes("delete like")){
        dispatch(clearFavourites());
      answer = "All favourite songs removed!";
    }
     else if(q.includes("remove like")){
        dispatch(clearFavourites());
      answer = "All favourite songs removed!";
    }
    else if (q.includes("logout")) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("loginuser");
      answer = "You have been logged out!";
      navigate("/login");
    }else if(q.includes("log out")){
      sessionStorage.removeItem("loginuser");
      answer = "You have been logged out!";
      navigate("/login");
    }else if(q.includes("sign out")){
     localStorage.removeItem("user");
      sessionStorage.removeItem("loginuser");
      answer = "You have been logged out!";
      navigate("/login");
    }
    else if (q.includes("how many") && q.includes("song")) {
      const total = singers.flatMap((s) => s.songs).length;
      answer = `There are ${total} songs available.`;
    }

    else if (q.includes("how many") && q.includes("favourite")) {
      answer = `You have ${favourites.length} favourite songs.`;
    }

    else if (q.includes("how many") && q.includes("history")) {
      answer = `You have ${history.length} recent history songs.`;
    }

    else if (q.includes("delete user") || q.includes("remove user")) {
      localStorage.removeItem("user");
      answer = "User removed from system!";
    }

    else if (q.includes("open chat")) {
      answer = "Opening Chat...";
      navigate("/chat");
    }

    else if (q.includes("hello") || q.includes("hi")) {
      answer = "Hello! How can I help you?";
    }
    else if (q.includes("how are you")) {
      answer = "I m working perfectly! What can I help you with?";
    }
    else if (q.includes("who made you")) {
      answer = "You made me inside this Music App!";
    }
    else if (q.includes("help")) {
      answer =
        "You can ask things like:\n" +
        "- who am i\n" +
        "- new songs\n" +
        "- odd songs\n" +
        "- clear history\n" +
        "- clear favourites\n" +
        "- logout\n" +
        "- change theme\n" +
        "- how many songs\n" +
        "- search song shape of you";
    }

    dispatch(
      storeMessage({
        question: text,
        answer,
      })
    );
  };

  return { processQuestion };
};

export default Question;
