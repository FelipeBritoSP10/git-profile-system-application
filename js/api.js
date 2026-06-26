const form = document.getElementById("githubSearchForm");
const input = document.getElementById("usernameInput");

const resultContainer = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = input.value.trim();

  if (!username) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      resultContainer.innerHTML = `
        <div class="alert alert-danger mt-3">
          Usuário não encontrado
        </div>
      `;
      return;
    }

    const data = await response.json();

    resultContainer.innerHTML = `
      <div class="card mt-4 shadow-lg bg-dark text-white border-secondary">
        <div class="card-body text-center">
          <img src="${data.avatar_url}" width="120" class="rounded-circle mb-3" />
          <h4>${data.name ?? data.login}</h4>
          <p>@${data.login}</p>

          <p>📦 Repositórios: ${data.public_repos}</p>
          <p>👥 Seguidores: ${data.followers}</p>

          <a href="${data.html_url}" target="_blank" class="btn btn-primary mt-2">
            Ver perfil no GitHub
          </a>
        </div>
      </div>
    `;

  } catch (error) {
    console.error("Erro:", error);
    resultContainer.innerHTML = `
      <div class="alert alert-warning mt-3">
        Erro ao buscar usuário
      </div>
    `;
  }
});