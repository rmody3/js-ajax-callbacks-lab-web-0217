function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

function searchRepositories () {
  searchTerms = $('#searchTerms').val().replace(" ","+")
  url = `https://api.github.com/search/repositories?q=${searchTerms}`
  $.get(url).done(function(data){
      showRepositories(data)
    }).fail(function(){
      displayError()
    })
}

function showRepositories(data) {
  const src = document.getElementById("repository-template").innerHTML
  const template = Handlebars.compile(src)
  const repoList = template(data)
  document.getElementById("results").innerHTML = repoList
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function getCommits(el) {
  const repo = el.dataset.repository
  const owner = el.dataset.owner
  url = `https://api.github.com/repos/${owner}/${repo}/commits`
  $.get(url).done(function(data){
      showCommits(data)
    }).fail(function(error){
      displayError()
    })
}


function showCommits(data) {
  const src = document.getElementById("commit-template").innerHTML
  const template = Handlebars.compile(src)
  const commitList = template(data)
  document.getElementById("details").innerHTML = commitList
}
