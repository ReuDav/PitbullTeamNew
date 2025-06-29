<script>
    let { name } = $props() 
</script>

<button>
    {name || "name!"}
</button>