export class Config {
  public static API = {
    ENDPOINT: "https://localhost:7057",
    PREFIX: "/api",
    PATHS: {
      GET: {
        AREAS: "/area/list",
        OPTIONS: "/picture/options",
        PICTURES: "/picture/list",
        PICTURES_ADMIN: "/picture/admin/list",
        PICTURE_DETAILS: "/picture/",
        YEARS: "/year/list",
      },
      POST: {
        REGISTER: "/account/register",
        LOGIN: "/account/login",
        UPLOAD_PICTURE: "/picture/upload",
      },
      PUT: {
        UPDATE_PICTURE: "/picture/update"
      },
      DELETE: {
        PICTURE: "/picture/delete/"
      }
    }
  }

  public static LOCAL_STORAGE = {
    TOKEN: "token"
  }

  public static IMAGE = {
    URL: "http://localhost:10000/devstoreaccount1/pictures/",
    TOKEN: "sv=2018-03-28&spr=https%2Chttp&st=2026-03-15T14%3A58%3A41Z&se=2026-06-30T13%3A58%3A00Z&sr=c&sp=rl&sig=BJy%2BAOAFsvvelX%2FP94K0vQdZK5tZoZjg4c3ToyV69H4%3D"
  }
}
