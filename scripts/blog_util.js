// const get_blog_posts = async () => {

//     url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIYnNipLnXtyxELbY9YLnH_FrhZbkG2trccjfCbs_T9QRP1H1xxQbGhVFKrhJLT97xNazFE7WvuXWy/pub?gid=0&single=true&output=csv";
//     data = await d3.csv(url);

//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i])
//     }
// };

// get_blog_posts();

function get_blog_posts() {

    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIYnNipLnXtyxELbY9YLnH_FrhZbkG2trccjfCbs_T9QRP1H1xxQbGhVFKrhJLT97xNazFE7WvuXWy/pub?gid=0&single=true&output=csv";
    data = d3.csv(url,d3.autoType);

    console.log(data);
    console.log(data.response);
    for (var i = 0; i < data.length; i++) {
        console.log(data[i])
    }
};

  