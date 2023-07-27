function calculateMinCost() {
            const input = document.getElementById("rope-lengths").value;
            const ropesArray = input.split(",").map((rope) => parseInt(rope.trim(), 10));
            const result = minCostOfRopes(ropesArray);
            document.getElementById("result").innerText = result;
        }

        function minCostOfRopes(ropes) {
            const minHeap = new MinHeap();

            // Convert the input array of ropes to a Min Heap
            for (const rope of ropes) {
                minHeap.insert(rope);
            }

            let totalCost = 0;

            // Combine the ropes until there's only one rope left
            while (minHeap.size() > 1) {
                const min1 = minHeap.extractMin();
                const min2 = minHeap.extractMin();
                const cost = min1 + min2;
                totalCost += cost;
                minHeap.insert(cost);
            }

            return totalCost;
        }

        // Min Heap class implementation
        class MinHeap {
            constructor() {
                this.heap = [];
            }

            insert(value) {
                this.heap.push(value);
                this.bubbleUp(this.heap.length - 1);
            }

            bubbleUp(index) {
                while (index > 0) {
                    const parentIndex = Math.floor((index - 1) / 2);
                    if (this.heap[parentIndex] <= this.heap[index]) break;
                    this.swap(index, parentIndex);
                    index = parentIndex;
                }
            }

            extractMin() {
                const min = this.heap[0];
                const last = this.heap.pop();

                if (this.heap.length > 0) {
                    this.heap[0] = last;
                    this.sinkDown(0);
                }

                return min;
            }

            sinkDown(index) {
                const leftChild = 2 * index + 1;
                const rightChild = 2 * index + 2;
                let smallest = index;

                if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                    smallest = leftChild;
                }

                if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                    smallest = rightChild;
                }

                if (smallest !== index) {
                    this.swap(index, smallest);
                    this.sinkDown(smallest);
                }
            }

            size() {
                return this.heap.length;
            }

            swap(i, j) {
                [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
            }
        }