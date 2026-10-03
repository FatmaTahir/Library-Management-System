# Step 1: Build stage with .NET 8 SDK
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files (.csproj) maintaining folder structure for caching restores
COPY ["MyService/MyService.csproj", "MyService/"]
COPY ["Library.Application/Library.Application.csproj", "Library.Application/"]
COPY ["Library.Domain/Library.Domain.csproj", "Library.Domain/"]
COPY ["Library.Infrastructure/Library.Infrastructure.csproj", "Library.Infrastructure/"]

# Restore all NuGet packages across projects
RUN dotnet restore "MyService/MyService.csproj"

# Copy all source files
COPY . .

# Build and Publish the executable project (MyService)
WORKDIR "/src/MyService"
RUN dotnet publish "MyService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Step 2: Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MyService.dll"]