import os

import uvicorn

if __name__ == "__main__":
    if os.environ.get("env") == "prod":
        reload = False
    else:
        reload = True

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=os.environ.get("PORT", 8000),
        reload=reload,
    )
