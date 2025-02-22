#!/bin/bash

COMPONENTS_DIR="src/lib/components"
SEARCH_PATHS=("src/lib/components" "src/routes")

# Find all .svelte component files in the components directory
components=$(find "$COMPONENTS_DIR" -type f -name "*.svelte" | sed "s|$COMPONENTS_DIR/||" | sed "s|.svelte||")

unused_components=()

for component in $components; do
    component_name=$(basename "$component")  # Extract the component name (without path)
    is_used=false

    # Search for the component in the defined paths
    for path in "${SEARCH_PATHS[@]}"; do
        if grep -qr "import.*$component_name" "$path" || grep -qr "<$component_name" "$path"; then
            is_used=true
            break
        fi
    done

    if [ "$is_used" = false ]; then
        unused_components+=("$component_name")
    fi
done

# Print results
if [ ${#unused_components[@]} -eq 0 ]; then
    echo "✅ All components are used."
else
    echo "❌ Unused components detected:"
    for comp in "${unused_components[@]}"; do
        echo "  - $comp.svelte"
    done
    exit 1  # Exit with error status
fi
