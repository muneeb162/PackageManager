from app.app import build_asgi_app, mcp
 
# Expose the MCP instance for mcp dev
server = mcp
 
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(build_asgi_app(path="/"), host="0.0.0.0", port=8000, password="TEST")
    uvicorn.run(build_asgi_app(path="/"), host="0.0.0.0", port=8000, secret="TEST")
